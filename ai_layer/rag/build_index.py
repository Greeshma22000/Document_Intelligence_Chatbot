from pathlib import Path

from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter

BASE_DIR = Path(__file__).resolve().parent

DOCS_DIR = BASE_DIR / "docs"
INDEX_DIR = BASE_DIR / "index"

EMBED_MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"


def load_pdfs():
    DOCS_DIR.mkdir(exist_ok=True)

    pdfs = list(DOCS_DIR.glob("*.pdf"))

    if len(pdfs) == 0:
        print(f"❌ No PDFs found in {DOCS_DIR}")
        print("👉 Put your PDF files inside this folder")
        exit()

    docs = []

    for pdf in pdfs:
        print(f"📄 Loading {pdf.name}")

        loader = PyPDFLoader(str(pdf))
        pages = loader.load()

        for p in pages:
            p.metadata["source_file"] = pdf.name

        docs.extend(pages)

    return docs


def main():

    print("📂 Docs folder:", DOCS_DIR)

    documents = load_pdfs()

    print("✂️ Splitting documents...")

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150
    )

    chunks = splitter.split_documents(documents)

    print(f"✅ Total chunks: {len(chunks)}")

    embeddings = HuggingFaceEmbeddings(
        model_name=EMBED_MODEL_NAME
    )

    print("🧠 Creating embeddings...")

    db = FAISS.from_documents(chunks, embeddings)

    INDEX_DIR.mkdir(exist_ok=True)

    db.save_local(str(INDEX_DIR))

    print("✅ FAISS index saved at:", INDEX_DIR)


if __name__ == "__main__":
    main()