import os
import requests
import logging

logger = logging.getLogger(__name__)

def fetch_weather_data(lat: float, lon: float) -> dict:
    """
    Fetches real-time weather data from WeatherAPI.com.
    Requires WEATHER_API_KEY environment variable.
    """
    api_key = os.getenv("WEATHER_API_KEY")
    if not api_key:
        logger.warning("WEATHER_API_KEY is missing. Returning empty weather data.")
        return {}

    url = f"https://api.weatherapi.com/v1/current.json?key={api_key}&q={lat},{lon}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        current = data.get("current", {})
        
        return {
            "temperature_c": current.get("temp_c", 0.0),
            "feels_like_c": current.get("feelslike_c", 0.0),
            "heat_index_c": current.get("heatindex_c", 0.0),
            "wind_speed": current.get("wind_kph", 0.0),
            "rainfall_mm": current.get("precip_mm", 0.0),
            "humidity_pct": current.get("humidity", 0.0),
            "visibility": current.get("vis_km", 10.0) * 1000
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        logger.error(f"Weather fetch failed for ({lat}, {lon}): {e}")
        return {}
