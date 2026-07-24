from keybert import KeyBERT

kw_model = KeyBERT()

def extract_keywords(text: str, top_n: int = 10):
    keywords = kw_model.extract_keywords(
        text,
        keyphrase_ngram_range=(1, 2),
        stop_words="english",
        top_n=top_n
    )

    return [keyword for keyword, score in keywords]