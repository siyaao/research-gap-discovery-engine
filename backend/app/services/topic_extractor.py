import re


def extract_topic(text: str):
    lines = [line.strip() for line in text.split("\n") if line.strip()]

    title = lines[0] if lines else "Unknown"

    words = re.findall(r"[A-Za-z]{4,}", text)

    stop_words = {
        "this", "that", "with", "from", "have",
        "were", "their", "which", "using",
        "into", "between", "about", "these",
        "those", "paper", "study", "research"
    }

    frequency = {}

    for word in words:
        word = word.lower()

        if word in stop_words:
            continue

        frequency[word] = frequency.get(word, 0) + 1

    keywords = sorted(
        frequency.items(),
        key=lambda x: x[1],
        reverse=True
    )[:10]

    return {
        "title": title,
        "keywords": [k[0] for k in keywords]
    }