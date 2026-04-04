import os
import requests
import logging

logger = logging.getLogger(__name__)

def fetch_traffic_data(lat: float, lon: float) -> dict:
    api_key = os.getenv("TRAFFIC_API_KEY")
    if not api_key:
        logger.warning("TRAFFIC_API_KEY is missing. Returning empty traffic data.")
        return {}

    # Query TomTom Flow Segment Data (Absolute) with 10m zoom radius
    url = f"https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?point={lat},{lon}&key={api_key}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        flow_segment = data.get("flowSegmentData", {})
        
        return {
            "currentSpeed": flow_segment.get("currentSpeed", 0),
            "freeFlowSpeed": flow_segment.get("freeFlowSpeed", 0),
            "currentTravelTime": flow_segment.get("currentTravelTime", 0),
            "freeFlowTravelTime": flow_segment.get("freeFlowTravelTime", 0),
            "roadClosure": flow_segment.get("roadClosure", False)
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        logger.error(f"Traffic fetch failed for ({lat}, {lon}): {e}")
        return {}
