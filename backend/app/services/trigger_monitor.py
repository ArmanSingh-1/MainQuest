import logging
from datetime import datetime, timedelta
from sqlalchemy.orm import Session

# Absolute imports based on FastAPI structure
from app.models.trigger_data import TriggerData # Model must be created separately in app.models
from app.db.session import SessionLocal # Database configuration must be created in app.db
from app.services.api_clients.weather_client import fetch_weather_data
from app.services.api_clients.aqi_client import fetch_aqi_data
from app.services.api_clients.traffic_client import fetch_traffic_data

logger = logging.getLogger(__name__)

# Configurable list of target delivery zones
ZONES_TO_MONITOR = [
    {"zone_id": "vadodara_sayajigunj", "lat": 22.3100, "lon": 73.1750},
    {"zone_id": "vadodara_waghodia", "lat": 22.2886, "lon": 73.3639},
    {"zone_id": "vadodara_alkapuri", "lat": 22.3081, "lon": 73.1666},
    {"zone_id": "vadodara_makarpura", "lat": 22.2597, "lon": 73.1979},
    {"zone_id": "vadodara_gotri", "lat": 22.3147, "lon": 73.1492},
]

def trigger_monitoring_job():
    """
    Background worker job intended to run via APScheduler every 10 minutes.
    Calls weather, AQI, and traffic APIs, and writes cleanly to the database.
    """
    logger.info("Starting scheduled 10-minute trigger monitoring...")
    
    db: Session = SessionLocal()
    try:
        # 1. Automatic Deletion: Prune data older than 14 days
        two_weeks_ago = datetime.utcnow() - timedelta(days=14)
        deleted_count = db.query(TriggerData).filter(TriggerData.timestamp < two_weeks_ago).delete()
        if deleted_count > 0:
            logger.info(f"Purged {deleted_count} expired trigger records from Database.")
            
        # 2. Sequential Data Fetch: Run API calls for each registered zone
        for zone in ZONES_TO_MONITOR:
            lat = zone["lat"]
            lon = zone["lon"]
            
            # Sub-module client calls
            weather = fetch_weather_data(lat, lon)
            aqi = fetch_aqi_data(lat, lon)
            traffic = fetch_traffic_data(lat, lon)
            
            # Database object mapping
            new_record = TriggerData(
                zone_id=zone["zone_id"],
                temperature_c=weather.get("temperature_c", 0.0),
                feels_like_c=weather.get("feels_like_c", 0.0),
                heat_index_c=weather.get("heat_index_c", 0.0),
                wind_speed=weather.get("wind_speed", 0.0),
                rainfall_mm=weather.get("rainfall_mm", 0.0),
                humidity_pct=weather.get("humidity_pct", 0.0),
                visibility=weather.get("visibility", 0.0),
                aqi_index=aqi.get("aqi_index", 0),
                currentSpeed=traffic.get("currentSpeed", 0),
                freeFlowSpeed=traffic.get("freeFlowSpeed", 0),
                currentTravelTime=traffic.get("currentTravelTime", 0),
                freeFlowTravelTime=traffic.get("freeFlowTravelTime", 0),
                roadClosure=traffic.get("roadClosure", False)
            )
            
            db.add(new_record)
            
        # Commit the transaction for all zones at once
        db.commit()
        logger.info("Successfully completed APIs fetch and saved trigger monitoring cycle.")
        
    except Exception as e:
        db.rollback()
        logger.error(f"Error executing trigger monitoring job: {e}")
    finally:
        db.close()

from apscheduler.schedulers.background import BackgroundScheduler

def start_trigger_monitor_scheduler():
    """
    Initializes and starts the APScheduler to run the trigger_monitoring_job every 10 minutes.
    This should typically be called once in your main FastAPI startup event.
    """
    scheduler = BackgroundScheduler()
    # Runs the job every 10 minutes
    scheduler.add_job(trigger_monitoring_job, 'interval', minutes=10)
    scheduler.start()
    logger.info("APScheduler created: trigger_monitoring_job will run every 10 minutes.")
    
    return scheduler

if __name__ == "__main__":
    # This block allows you to run this script directly to test the schedule
    logging.basicConfig(level=logging.INFO)
    logger.info("Testing trigger_monitor.py schedule manually...")
    
    scheduler = start_trigger_monitor_scheduler()
    
    # Keep the main thread alive so the background scheduler can run
    import time
    try:
        while True:
            time.sleep(1)
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()
        logger.info("Scheduler correctly shut down.")
