import fitz  # PyMuPDF

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extracts text from a PDF file provided as bytes.
    """
    try:
        pdf_document = fitz.open(stream=file_bytes, filetype="pdf")
        text = ""

        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            text += page.get_text()

        text = text.strip()

        # 🔥 DEBUG HERE
        print("\n===== EXTRACTED TEXT PREVIEW =====")
        print(text[:300])
        print("=================================\n")

        return text

    except Exception as e:
        print(f"Error extracting PDF: {e}")
        return ""