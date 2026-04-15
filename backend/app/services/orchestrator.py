from app.agents.symptom_agent import analyze_symptoms
from app.agents.risk_agent import analyze_risk
from app.agents.report_agent import analyze_report
from app.agents.insurance_agent import recommend_insurance

def run_text_pipeline(user_input: str):
    symptom_result = analyze_symptoms(user_input)
    risk_result = analyze_risk(symptom_result)


    return {
    "type": "text_analysis",
    "symptoms_analysis": symptom_result,
    "risk_analysis": risk_result
}


def run_report_pipeline(report_text: str):
    report_result = analyze_report(report_text)
    risk_result = analyze_risk(report_result)
    insurance_result = recommend_insurance(report_result, risk_result)


    return {
    "type": "report_analysis",
    "report_analysis": report_result,
    "risk_analysis": risk_result,
    "insurance_recommendation": insurance_result
    }

