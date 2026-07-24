import os
import requests
from dotenv import load_dotenv

load_dotenv()

BASE_URL = "https://api.semanticscholar.org/graph/v1/paper/search"

API_KEY = os.getenv("SEMANTIC_SCHOLAR_API_KEY")

headers = {}

if API_KEY:
    headers["x-api-key"] = API_KEY


def search_papers(query: str, limit: int = 5):
    params = {
        "query": query,
        "limit": limit,
        "fields": "title,authors,year,abstract,citationCount,url"
    }

    response = requests.get(
        BASE_URL,
        headers=headers,
        params=params,
        timeout=30,
        verify=False   # Remove this after SSL is permanently fixed
    )

    if response.status_code != 200:
        return []

    data = response.json()

    return data.get("data", [])