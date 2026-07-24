import os
import requests
from dotenv import load_dotenv
from pathlib import Path

# Load .env from backend folder
env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

API_KEY = os.getenv("OPENROUTER_API_KEY")

print("OPENROUTER_API_KEY:", API_KEY[:15] + "..." if API_KEY else "None")


def generate_research_gap(text, keywords, papers):

    if not API_KEY:
        raise Exception("OPENROUTER_API_KEY not found in .env")

    prompt = f"""
You are an expert AI Research Assistant.

Uploaded Research Paper:
{text[:8000]}

Extracted Keywords:
{keywords}

Related Research Papers:
{papers}

Analyze the uploaded research paper and generate a detailed report with the following sections:

1. Executive Summary
2. Existing Research
3. Research Gaps
4. Limitations
5. Future Research Directions
6. Novel Research Ideas

Return the response in Markdown format.
"""

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:8000",
            "X-Title": "AI Research Gap Discovery Engine"
        },
        json={
            "model": "openrouter/free",
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        },
        timeout=60
    )

    print("Status Code:", response.status_code)
    print("Response:", response.text)

    if response.status_code != 200:
        raise Exception(
            f"OpenRouter Error {response.status_code}: {response.text}"
        )

    data = response.json()

    return data["choices"][0]["message"]["content"]