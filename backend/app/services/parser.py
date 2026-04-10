import fitz  # PyMuPDF
from docx import Document


def extract_text_from_pdf(file_path: str) -> str:
    text = []
    pdf = fitz.open(file_path)
    for page in pdf:
        text.append(page.get_text())
    pdf.close()
    return "\n".join(text).strip()


def extract_text_from_docx(file_path: str) -> str:
    doc = Document(file_path)
    text = [para.text for para in doc.paragraphs if para.text.strip()]
    return "\n".join(text).strip()


def extract_resume_text(file_path: str, filename: str) -> str:
    filename = filename.lower()

    if filename.endswith(".pdf"):
        return extract_text_from_pdf(file_path)
    elif filename.endswith(".docx"):
        return extract_text_from_docx(file_path)
    else:
        raise ValueError("Unsupported file format. Only PDF and DOCX are allowed.")