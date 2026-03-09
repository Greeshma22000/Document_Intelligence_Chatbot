import { useState } from "react";
import "./App.css";

type Role = "user" | "assistant";

type ChatMessage = {
  role: Role;
  content: string;
};

const API_BASE_URL = "http://localhost:3000";

function App() {

  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: "Hi! Ask me anything." },]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // ---------------- PDF UPLOAD ----------------

  async function uploadPDF() {

    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData
      });

      // Check server response
      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();

      alert(`PDF Uploaded Successfully: ${data.file || "Indexed"}`);

      setFile(null);

    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload PDF");
    }
  }

  // ---------------- SEND MESSAGE ----------------

  async function sendMessage() {

    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {

      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMessage.content
        })
      });

      if (!res.ok) {
        throw new Error("Chat API failed");
      }

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.reply || "No response"
      };

      setMessages([...updatedMessages, assistantMessage]);

    } catch (error) {

      console.error("Chat error:", error);

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Error getting response from server"
        }
      ]);

    }

    setLoading(false);
  }

  // ---------------- UI ----------------

  return (
    <div className="app">

      <h1>📄 PDF Chat Assistant</h1>

      {/* -------- PDF Upload -------- */}

      <div className="upload-box">
        
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
            }
          }}
        />

        <button onClick={uploadPDF}>
          Upload PDF
        </button>

      </div>

      {/* -------- Chat -------- */}

      <div className="chat-box">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.role === "user" ? "user" : "assistant"}`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="message assistant">
            typing...
          </div>
        )}

      </div>

      {/* -------- Input Box -------- */}

      <div className="input-box">

        <input
          type="text"
          placeholder="Ask a question about your PDF..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>
          Send ▶
        </button>

      </div>

    </div>
  );
}

export default App;