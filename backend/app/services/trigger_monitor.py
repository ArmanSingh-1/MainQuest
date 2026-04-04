import logging
from datetime import datetime, timezone

from app.db.supabase_client import get_supabase
from app.services.api_clients.weather_client import fetch_weather_data
from app.services.api_clients.aqi_client import fetch_aqi_data
from app.services.api_clients.traffic_client import fetch_traffic_data

logger = logging.getLogger(__name__)

# ─── Delivery zones to monitor ───────────────────────────────────────────────
ZONES_TO_MONITOR = [
    {"zone_id": "vadodara_sayajigunj", "lat": 22.3100, "lon": 73.1750},
    {"zone_id": "vadodara_waghodia",   "lat": 22.2886, "lon": 73.3639},
    {"zone_id": "vadodara_alkapuri",   "lat": 22.3081, "lon": 73.1666},
    {"zone_id": "vadodara_makarpura",  "lat": 22.2597, "lon": 73.1979},
    {"zone_id": "vadodara_gotri",      "lat": 22.3147, "lon": 73.1492},
]


def trigger_monitoring_job():
    """
    Background worker job — runs via APScheduler every 10 minutes.
    Fetches weather, AQI, and traffic data per zone and writes directly
    to Supabase (trigger_data table) using the service role key.
    """
    logger.info("Starting scheduled 10-minute trigger monitoring...")
    supabase = get_supabase()

    records = []
    now_utc = datetime.now(timezone.utc).isoformat()

    for zone in ZONES_TO_MONITOR:
        lat = zone["lat"]
        lon = zone["lon"]

        weather = fetch_weather_data(lat, lon)
        aqi     = fetch_aqi_data(lat, lon)
        traffic = fetch_traffic_data(lat, lon)

        record = {
            "zone_id":              zone["zone_id"],
            "temperature_c":        weather.get("temperature_c", 0.0),
            "feels_like_c":         weather.get("feels_like_c", 0.0),
            "heat_index_c":         weather.get("heat_index_c", 0.0),
            "wind_speed":           weather.get("wind_speed", 0.0),
            "rainfall_mm":          weather.get("rainfall_mm", 0.0),
            "humidity_pct":         weather.get("humidity_pct", 0.0),
            "visibility":           weather.get("visibility", 0.0),
            "aqi_index":            aqi.get("aqi_index", 0),
            "currentspeed":         traffic.get("currentSpeed", 0),
            "freeflowspeed":        traffic.get("freeFlowSpeed", 0),
            "currenttraveltime":    traffic.get("currentTravelTime", 0),
            "freeflowtraveltime":   traffic.get("freeFlowTravelTime", 0),
            "roadclosure":          traffic.get("roadClosure", False),
            "timestamp":            now_utc,
        }
        records.append(record)
        logger.info(f"  Prepared record for zone: {zone['zone_id']}")

    # ── Bulk insert all zones in one request ─────────────────────────────────
    try:
        response = supabase.table("trigger_data").insert(records).execute()

        # supabase-py v2: response.data contains inserted rows on success
        if response.data:
            logger.info(
                f"Successfully inserted {len(response.data)} trigger records into Supabase."
            )
        else:
            logger.error(f"Supabase insert returned no data. Response: {response}")

    except Exception as e:
        logger.error(f"Failed to insert trigger records into Supabase: {e}", exc_info=True)

    # ── Prune records older than 14 days ──────────────────────────────────────
    try:
        from datetime import timedelta
        cutoff = (datetime.now(timezone.utc) - timedelta(days=14)).isoformat()
        del_response = (
            supabase.table("trigger_data")
            .delete()
            .lt("timestamp", cutoff)
            .execute()
        )
        deleted = del_response.data or []
        if deleted:
            logger.info(f"Purged {len(deleted)} expired trigger records (older than 14 days).")
    except Exception as e:
        logger.warning(f"Could not prune old trigger records: {e}")


# ─── Scheduler bootstrap ─────────────────────────────────────────────────────
from apscheduler.schedulers.background import BackgroundScheduler


def start_trigger_monitor_scheduler():
    """
    Initializes APScheduler to run trigger_monitoring_job every 10 minutes.
    Call once from the FastAPI startup event.
    """
    scheduler = BackgroundScheduler()
    scheduler.add_job(trigger_monitoring_job, "interval", minutes=10)
    scheduler.start()
    logger.info("APScheduler started: trigger_monitoring_job runs every 10 minutes.")
    return scheduler


if __name__ == "__main__":
    import time
    import sys
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
        handlers=[logging.StreamHandler(sys.stdout)],
    )
    logger.info("Running trigger_monitor.py directly for testing...")

    # Run once immediately so you can verify the insert in Supabase right away
    trigger_monitoring_job()

    scheduler = start_trigger_monitor_scheduler()
    try:
        while True:
            time.sleep(1)
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()
        logger.info("Scheduler shut down cleanly.")
