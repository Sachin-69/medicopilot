from app.agents.symptom_agent import analyze_symptoms

if __name__ == "__main__":
    test_input = "fever, headache, fatigue"

    result = analyze_symptoms(test_input)

    print("=== RESULT ===")
    print(result)
