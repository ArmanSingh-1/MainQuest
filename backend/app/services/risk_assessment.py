import joblib
import os
import copy
import numpy as np
import logging

logger = logging.getLogger(__name__)

# 1. Define paths and load the GLOBAL model once at startup
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, '../ml_artifacts/arka_global_sgd.joblib')
SCALER_PATH = os.path.join(BASE_DIR, '../ml_artifacts/arka_scaler.joblib')

try:
    global_model = joblib.load(MODEL_PATH)
    global_scaler = joblib.load(SCALER_PATH)
    logger.info("✅ Global MLR (SGD) and Scaler loaded successfully.")
except FileNotFoundError:
    logger.warning("⚠️ Global model artifacts missing! Run scripts/train_global_model.py first.")
    global_model = None
    global_scaler = None


def calculate_personalized_baseline(user_history: list, current_week_features: dict) -> float:
    """
    Calculates the predicted baseline income using Ephemeral Fine-Tuning.
    
    :param user_history: List of dicts containing past weeks' data.
                         e.g. [{'deliveries': 120, 'hours': 40, 'distance': 300, 'zone_risk': 0.8, 'rating': 4.8, 'actual_income': 8500}, ...]
    :param current_week_features: Dict of the CURRENT week's features to predict against.
    """
    if not global_model or not global_scaler:
        raise RuntimeError("ML Models are not loaded. Cannot process claim.")

    # 1. Format the target week's features for prediction
    X_current = np.array([[
        current_week_features.get('deliveries', 0),
        current_week_features.get('hours', 0),
        current_week_features.get('distance', 0),
        current_week_features.get('zone_risk', 0.5),
        current_week_features.get('rating', 4.5)
    ]])
    
    X_current_scaled = global_scaler.transform(X_current)

    # 2. If the user is new (probationary, < 12 weeks of data)
    # Just use the global model without any personal fine-tuning.
    if not user_history or len(user_history) < 12:
        logger.info("User has <12 weeks data. Using Global Baseline.")
        predicted_income = global_model.predict(X_current_scaled)[0]
        return max(0.0, float(predicted_income))

    # 3. IF USER HAS >= 12 WEEKS DATA: Ephemeral Fine-Tuning
    logger.info(f"Personalizing model using {len(user_history)} weeks of user history...")
    
    # Extract historical X and y
    X_hist = np.array([[
        row['deliveries'], row['hours'], row['distance'], row['zone_risk'], row['rating']
    ] for row in user_history])
    
    y_hist = np.array([row['actual_income'] for row in user_history])
    
    # Scale historical data
    X_hist_scaled = global_scaler.transform(X_hist)

    # CREATE A TEMPORARY IN-MEMORY COPY OF THE GLOBAL MODEL
    temp_personal_model = copy.deepcopy(global_model)

    # .partial_fit() nudges the weights toward the user's specific history
    temp_personal_model.partial_fit(X_hist_scaled, y_hist)

    # Make the highly personalized prediction
    predicted_income = temp_personal_model.predict(X_current_scaled)[0]

    # The temp_personal_model is destroyed instantly when this function returns
    return max(0.0, float(predicted_income))
