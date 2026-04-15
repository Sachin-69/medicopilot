import os
from openai import AzureOpenAI
from dotenv import load_dotenv

load_dotenv()


def call_llm(prompt: str) -> str:
    try:
        client = AzureOpenAI(
            api_key=os.getenv("AZURE_OPENAI_API_KEY"),
            api_version="2024-02-15-preview",
            azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        )

        response = client.chat.completions.create(
            model=os.getenv("AZURE_OPENAI_DEPLOYMENT", "gpt4o-mini"),
            messages=[
                {"role": "system", "content": "You are a helpful medical assistant."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.3,
            max_tokens=300,
        )

        return response.choices[0].message.content

    except Exception as e:
        prompt_lower = prompt.lower()

    # 🛡️ Insurance Agent
    if "insurance" in prompt_lower or "policy" in prompt_lower:
        return """{
  "risk_category": "medium",
  "recommended_policy": "premium",
  "key_flags": ["hypertension", "high cholesterol"],
  "notes": "Mock response: based on moderate health risks, a premium policy is recommended."
}"""

    # 📊 Report Agent
    elif "medical report" in prompt_lower or "report:" in prompt_lower:
        return """{
  "summary": "Mock summary: patient shows signs of hypertension and elevated cholesterol.",
  "abnormalities": ["high blood pressure", "high cholesterol"],
  "concerns": ["cardiovascular risk"]
}"""

    # 🧠 Risk Agent
    elif "risk" in prompt_lower:
        return """{
  "risk_level": "low",
  "reason": "Mock response: no serious indicators",
  "urgency": "monitor"
}"""

    # 🧬 Symptom Agent (default)
    else:
        return """{
  "conditions": ["sample condition"],
  "severity": "low",
  "advice": "Mock response: rest and hydration"
}"""