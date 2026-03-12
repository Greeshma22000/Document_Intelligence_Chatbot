# Document Intelligence ChatBot
## Introduction
A chatbot that allows users to upload PDFs and ask questions based on document content using RAG, and generate answers using LLM.

#### Problem statement
Organizations store large amounts of PDF documentations such as policies, manuals, research papers, and reports.
However, finding specific information in large documents is difficult.
Challenges:
    Finding specific information quickly
    Understanding long documents
    Extracting knowledge efficiently 

#### Solution
Build an AI System that
    Uploads and processes PDFs
    Converts documents into embeddings
    Stores them in a vector database
    Retrieves relevant chunks or information
    Uses an LLM to generate answers

## Features
- Upload PDF
- Ask questions
- AI answers from document
- Document summary

## Getting Started

### Tech Stack

- **React + TypeScript**
- **Node.JS + Express.JS**
- **FastAPI + FAISS + Embeddings + LLM**

## Project Structure
```
Project/
|
├── frontend_layer/
├── backend_layer/
├── ai_layer/
|├── rag/
|├── retriever.py
|└── app.py
|
└── README.md
```
## frontend_layer

### Installations


```bash 
npm create vite@latest .
enter
select react
enter
select typescript
enter
```

```bash
npm run dev
```

## backend_layer

### Installations

```bash
npm init -y
npm install express dotenv cors form-data multer node-fetch
for dev dependence
npm install nodemon -D
```

```bash
npm run dev
```

## ai_layer

### Installations

```bash
fastapi
uvicorn
python-multipart
langchain
langchain-community
langchain-text-splitters
faiss-cpu
sentence-transformers
anthropic
python-dotenv
pypdf

To install all of them use this  
pip install -r requirements.txt  
```

```bash
1.Run this first
    python rag/build_index.py 
2.Start the server
    python -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

## Embeddings

Embeddings convert text into numerical vectors. 
Computers cannot understand text directly. 
Vectors allow semantic similarity search
Example:
    Sentence → Vector
    "What is refund rules?"
    → [0.21, -0.45, 0.78, ...]

## Chunking Strategy

Splitting large documents into smaller pieces or chunks.
LLMs have token limits.
Chunking improves retrieval accuracy.
We implement using:
    RecursiveCharacterTextSplitter
    Chunk size: 900
    Overlap: 180 