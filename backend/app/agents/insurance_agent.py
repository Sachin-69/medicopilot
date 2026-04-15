import json
from app.services.llm_service import call_llm

def recommend_insurance(report_data: dict, risk_data: dict) -> dict:
    """
    Analyzes medical report output and risk data to recommend a suitable insurance policy.
    Simulates how an underwriter evaluates risk based on health data.
    """
    
    # Safely convert inputs to strings and limit size to avoid token overflow
    report_text = json.dumps(report_data)[:2000]
    risk_text = json.dumps(risk_data)[:1000]

    prompt = (
        "You are an expert insurance underwriter AI.\n\n"
        "Your task:\n"
        "- Analyze the provided medical report data (summary, abnormalities, concerns).\n"
        "- Analyze the provided risk assessment data (risk level, urgency).\n"
        "- Determine the overall risk category (low, medium, or high).\n"
        "- Recommend ONE suitable insurance policy type: 'basic', 'premium', or 'high-risk'.\n"
        "- Identify key health flags that insurers would care about.\n"
        "- Provide a clear explanation of your recommendation without using financial advice disclaimers.\n\n"
        "STRICT RULES:\n"
        "- Return ONLY valid JSON (no extra text or markdown formatting).\n"
        "- Do NOT add conversational text or disclaimers.\n\n"
        f"--- MEDICAL REPORT ---\n{report_text}\n\n"
        f"--- RISK ASSESSMENT ---\n{risk_text}\n\n"
        "Expected JSON Output format:\n"
        "{\n"
        '  "risk_category": "low/medium/high",\n'
        '  "recommended_policy": "basic/premium/high-risk",\n'
        '  "key_flags": ["list of important health issues"],\n'
        '  "notes": "clear explanation of recommendation"\n'
        "}\n"
    )

    try:
        response = call_llm(prompt)
        parsed = json.loads(response)
        return parsed
    except Exception as e:
        return {
            "risk_category": "high",
            "recommended_policy": "high-risk",
            "key_flags": ["Error parsing data"],
            "notes": f"Fallback response due to an error: {str(e)}"
        }
