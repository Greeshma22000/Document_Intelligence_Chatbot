# Document Intelligence ChatBot
## Introduction
A chatbot that allows users to upload PDFs and ask questions based on document content using RAG, and generate answers using LLM.
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

1. Create frontend
```bash 
npm create vite@latest .
```
2. To Run
```bash
npm run dev
```