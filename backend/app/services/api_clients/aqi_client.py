import os
import requests
import logging

logger = logging.getLogger(__name__)

def fetch_aqi_data(lat: float, lon: float) -> dict:
    """
    Fetches air quality index from aqicn.org.
    Requires AQI_API_KEY environment variable.
    """
    api_key = os.getenv("AQI_API_KEY")
    if not api_key:
        logger.warning("AQI_API_KEY is missing. Returning empty AQI data.")
        return {}

    url = f"https://api.waqi.info/feed/geo:{lat};{lon}/?token={api_key}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        result = response.json()
        
        if result.get("status") == "ok":
            data = result.get("data", {})
            return {
                "aqi_index": data.get("aqi", 0),
            }
        return {}
    except Exception as e:
        import traceback
        traceback.print_exc()
        logger.error(f"AQI fetch failed for ({lat}, {lon}): {e}")
        return {}
