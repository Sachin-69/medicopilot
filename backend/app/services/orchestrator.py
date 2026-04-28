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


def calculate_severity(abnormalities: list) -> str:
    if not abnormalities:
        return "low"

    text = " ".join(abnormalities).lower()

    # 🔴 High-risk indicators
    high_risk_keywords = [
        "high blood pressure",
        "chest pain",
        "very high",
        "critical",
        "severe"
    ]

    # 🟡 Medium-risk indicators
    medium_risk_keywords = [
        "elevated",
        "high cholesterol",
        "low hemoglobin",
        "prediabetes"
    ]

    # 🔍 Check for high-risk first
    if any(keyword in text for keyword in high_risk_keywords):
        return "high"

    # Then medium
    if any(keyword in text for keyword in medium_risk_keywords):
        return "medium"

    return "low"

def run_report_pipeline(report_text: str):
    report_result = analyze_report(report_text)
    abnormalities = report_result.get("abnormalities", [])
    severity = calculate_severity(abnormalities)

    risk_result = analyze_risk({
        "conditions": report_result.get("concerns", []),
        "severity": severity
    })
    insurance_result = recommend_insurance(report_result, risk_result)


    return {
    "type": "report_analysis",
    "report_analysis": report_result,
    "risk_analysis": risk_result,
    "insurance_recommendation": insurance_result
    }

