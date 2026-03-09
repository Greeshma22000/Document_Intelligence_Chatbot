import os
from pathlib import Path
from fastapi import FastAPI, UploadFile, File
from anthropic import Anthropic
from dotenv import load_dotenv

from rag.retriever import retrieve
from rag.build_index import main

load_dotenv()

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
client = Anthropic(api_key=ANTHROPIC_API_KEY)

BASE_DIR = Path(__file__).resolve().parent
DOCS_DIR = BASE_DIR / "rag" / "docs"
DOCS_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI()


@app.get("/health")
def health():
    return {"ok": True}


# ---------------- PDF UPLOAD ----------------

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = DOCS_DIR / file.filename

    with open(file_path, "wb") as f:
        f.write(await file.read())

    # load_pdfs(str(file_path))
    main()

    return {"status": "indexed", "file": file.filename}


# ---------------- CHAT ----------------

@app.post("/chat")
async def chat(req: dict):

    message = req["message"]

    contexts = retrieve(message)

    context_text = "\n\n".join(
        [c["text"] for c in contexts]
    )

    system_prompt = f"""
Use ONLY the provided context.

Context:
{context_text}
"""

    resp = client.messages.create(
        model="claude-3-haiku-20240307",
        system=system_prompt,
        messages=[{"role": "user", "content": message}],
        max_tokens=400,
    )

    reply = resp.content[0].text

    return {"reply": reply}