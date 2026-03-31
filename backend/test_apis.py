# test_apis.py

import os
import logging
import traceback

# Set your API key directly here for testing
os.environ["WEATHER_API_KEY"] = "YOUR_WEATHER_API_KEY"
os.environ["AQI_API_KEY"] = "YOUR_AQICN_ORG_API_KEY"
os.environ["TRAFFIC_API_KEY"] = "YOUR_TOMTOM_API_KEY"

# Set logging to see any errors perfectly
logging.basicConfig(level=logging.ERROR)

from app.services.api_clients.weather_client import fetch_weather_data
from app.services.api_clients.aqi_client import fetch_aqi_data
from app.services.api_clients.traffic_client import fetch_traffic_data

if __name__ == "__main__":
    ZONES_TO_MONITOR = [
        {"zone_id": "vadodara_sayajigunj", "lat": 22.3100, "lon": 73.1750},
        {"zone_id": "vadodara_waghodia", "lat": 22.2886, "lon": 73.3639},
        {"zone_id": "vadodara_alkapuri", "lat": 22.3081, "lon": 73.1666},
        {"zone_id": "vadodara_makarpura", "lat": 22.2597, "lon": 73.1979},
        {"zone_id": "vadodara_gotri", "lat": 22.3147, "lon": 73.1492},
    ]

    for zone in ZONES_TO_MONITOR:
        print(f"\n" + "="*50)
        print(f"FETCHING DATA FOR REGION: {zone['zone_id'].upper()}")
        print(f"Coordinates: {zone['lat']}, {zone['lon']}")
        print("="*50)
        
        test_lat = zone["lat"]
        test_lon = zone["lon"]

        print("\n--- WeatherAPI.com (Weather) ---")
        weather_result = fetch_weather_data(test_lat, test_lon)
        if weather_result == {}:
            print("FAILED! The API call returned an empty dictionary.")
        else:
            for key, value in weather_result.items():
                print(f"  {key}: {value}")

        print("\n--- AQICN.org (AQI) ---")
        aqi_result = fetch_aqi_data(test_lat, test_lon)
        if aqi_result == {}:
            print("FAILED! The AQI API call returned an empty dictionary.")
        else:
            for key, value in aqi_result.items():
                print(f"  {key}: {value}")

        print("\n--- TomTom (Traffic) ---")
        traffic_result = fetch_traffic_data(test_lat, test_lon)
        if traffic_result == {}:
            print("FAILED! The Traffic API call returned an empty dictionary.")
        else:
            for key, value in traffic_result.items():
                print(f"  {key}: {value}")
        print("\n")
