from app.agents.symptom_agent import analyze_symptoms
from app.agents.risk_agent import analyze_risk

def run_pipeline(user_input: str):
# Step 1: Symptom analysis
    symptom_result = analyze_symptoms(user_input)

# Step 2: Risk analysis
    risk_result = analyze_risk(symptom_result)

    return {
        "symptoms_analysis": symptom_result,
        "risk_analysis": risk_result
    }