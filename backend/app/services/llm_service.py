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
        # Smart mock based on prompt type
        if "risk" in prompt.lower():
            return """{
  "risk_level": "low",
  "reason": "Mock response: no serious indicators",
  "urgency": "monitor"
}"""
        elif "report" in prompt.lower() or "summary" in prompt.lower():
            return """{
  "summary": "Mock summary: PDF extracted successfully but AI failed.",
  "abnormalities": ["mock abnormality 1"],
  "concerns": ["mock concern 1"]
}"""
        else:
            return """{
  "conditions": ["sample condition"],
  "severity": "low",
  "advice": "Mock response: rest and hydration"
}"""