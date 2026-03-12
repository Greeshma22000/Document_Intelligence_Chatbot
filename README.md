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