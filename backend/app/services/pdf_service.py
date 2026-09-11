import pymupdf


def extract_pdf_data(file_path: str):
    pdf = pymupdf.open(file_path)

    text = ""

    for page in pdf:
        text += page.get_text()

    pages = len(pdf)

    pdf.close()
    return text

    lines = [
        line.strip()
        for line in text.split("\n")
        if line.strip()
    ]

    title = lines[0] if lines else "Unknown Title"

    return {
        "title": title,
        "pages": pages,
        "text": text,
        "characters": len(text)
    }