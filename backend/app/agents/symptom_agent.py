import json
from app.services.llm_service import call_llm


def analyze_symptoms(text: str) -> dict:
    prompt = (
        "You are a responsible medical assistant AI.\n\n"

        "Your job:\n"
        "- Understand user symptoms\n"
        "- Suggest POSSIBLE general health concerns (NOT diagnoses)\n"
        "- Assess severity (low / medium / high)\n"
        "- Suggest appropriate next steps\n\n"

        "IMPORTANT SAFETY RULES:\n"
        "- Do NOT provide medical diagnosis\n"
        "- Do NOT use specific disease names like 'heart attack', 'stroke', etc.\n"
        "- Use general terms such as:\n"
        "  • 'cardiac-related issue'\n"
        "  • 'respiratory concern'\n"
        "  • 'neurological concern'\n"
        "  • 'gastrointestinal issue'\n"
        "- Keep the response safe, general, and informative\n\n"

        "REASONING GUIDELINES:\n"
        "- Base insights on symptoms provided\n"
        "- Consider combinations of symptoms\n"
        "- If symptoms are severe (e.g., chest pain, breathing difficulty), mark severity as HIGH\n"
        "- If symptoms are mild, mark severity as LOW\n\n"

        f"Input:\n{text}\n\n"

        "Return ONLY valid JSON with this EXACT structure:\n"
        "{\n"
        '  "conditions": ["general concern 1", "general concern 2"],\n'
        '  "severity": "low/medium/high",\n'
        '  "advice": "clear next steps for the user"\n'
        "}\n"
    )

    try:
        response = call_llm(prompt)
        parsed = json.loads(response)
        return parsed

    except Exception as e:
        return {
            "conditions": [],
            "severity": "unknown",
            "advice": f"Error: {str(e)}"
        }