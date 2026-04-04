import os
import pandas as pd
import numpy as np
from sklearn.linear_model import SGDRegressor
from sklearn.preprocessing import StandardScaler
import joblib

def prepare_global_data(csv_path):
    print(f"Loading data from {csv_path}...")
    df = pd.read_csv(csv_path)
    
    # ARKA_1.csv contains order-level data. We need to aggregate this into WEEKLY data 
    # for the model. For this script, we will simulate a weekly grouping.
    # In a real scenario, you'd group by Delivery_Partner_ID and Week_Number.
    
    # Grouping into chunks of 150 orders (approximating one week of work for a driver)
    df['simulated_week_id'] = np.arange(len(df)) // 150
    
    weekly_stats = df.groupby('simulated_week_id').agg(
        avg_deliveries=('Time_of_Order', 'count'), # Count of orders
        avg_hours=('Riding_Time_min', lambda x: x.sum() / 60), # Total hours riding
        avg_distance_km=('Distance_Covered_km', 'sum'),
        # Synthesizing zone risk and rating for the global baseline
        zone_risk_score=('Demand_Surge', 'mean'), # Using demand surge as a proxy for zone risk
        performance_rating=('Time_Taken_min', lambda x: 5.0 - (x.mean()/100)) 
    ).reset_index()
    
    # Calculate actual weekly income (Known_Fees + Surcharges + Tips)
    weekly_income = df.groupby('simulated_week_id').agg(
        total_income=('Known_Fees', 'sum'),
        total_tips=('Tip_Amount', 'sum'),
        total_surcharge=('Effort_Surcharge_INR', 'sum')
    )
    weekly_stats['actual_weekly_income'] = weekly_income['total_income'] + weekly_income['total_tips'] + weekly_income['total_surcharge']
    
    # Normalize the proxy zone risk to be between 0 and 1
    weekly_stats['zone_risk_score'] = (weekly_stats['zone_risk_score'] - weekly_stats['zone_risk_score'].min()) / (weekly_stats['zone_risk_score'].max() - weekly_stats['zone_risk_score'].min())
    
    return weekly_stats

def train_and_save_global_model():
    # 1. Paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(base_dir, '../data/ARKA_1.csv')
    artifacts_dir = os.path.join(base_dir, '../app/ml_artifacts')
    
    os.makedirs(artifacts_dir, exist_ok=True)

    # 2. Load and Prepare Data
    try:
        df = prepare_global_data(csv_path)
    except FileNotFoundError:
        print(f"Error: Please place ARKA_1.csv in the backend/data/ directory.")
        return

    # Features must match the README: deliveries, hours, distance, zone_risk, rating
    X = df[['avg_deliveries', 'avg_hours', 'avg_distance_km', 'zone_risk_score', 'performance_rating']]
    y = df['actual_weekly_income']

    print(f"Training global model on {len(df)} weeks of historical data...")

    # 3. Scale the features (SGD is very sensitive to unscaled data)
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # 4. Train the SGD Regressor
    # max_iter and tol ensure it converges cleanly
    model = SGDRegressor(max_iter=2000, tol=1e-4, random_state=42)
    model.fit(X_scaled, y)

    # 5. Save Artifacts
    model_path = os.path.join(artifacts_dir, 'arka_global_sgd.joblib')
    scaler_path = os.path.join(artifacts_dir, 'arka_scaler.joblib')
    
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)

    print("✅ Global Model & Scaler trained and saved to app/ml_artifacts/")

if __name__ == "__main__":
    train_and_save_global_model()
