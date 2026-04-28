import os
from openai import AzureOpenAI
from dotenv import load_dotenv

load_dotenv()

client = None

try:
    client = AzureOpenAI(
        api_key=os.getenv("AZURE_OPENAI_API_KEY"),
        api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
    )
except Exception as e:
    print("Azure client init failed:", e)


def call_llm(prompt: str) -> str:
    try:
        response = client.chat.completions.create(
            model=os.getenv("AZURE_OPENAI_DEPLOYMENT"),
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant. Always return valid JSON."},
                {"role": "user", "content": prompt}
            ]
        )

        return response.choices[0].message.content

    except Exception as e:
        print("LLM ERROR:", e)

        # fallback mock
        return """{
  "summary": "Fallback response due to error",
  "abnormalities": [],
  "concerns": []
}"""