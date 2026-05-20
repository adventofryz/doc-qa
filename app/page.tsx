"use client";
import { useState } from "react";

export default function Home() {
  const [document, setDocument] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!document || !question) return;
    setLoading(true);
    setAnswer("");

    const res = await fetch("/api/qa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ document, question }),
    });

    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-3xl p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Document Q&A</h1>
          <p className="text-gray-500 text-sm">Paste any document, ask a question, get an answer — powered by a local AI model.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Document</label>
          <textarea
            className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-800 h-48 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste your document here..."
            value={document}
            onChange={e => setDocument(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
          <input
            className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What do you want to know?"
            value={question}
            onChange={e => setQuestion(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !document || !question}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-xl transition-colors"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>

        {answer && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Answer</p>
            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{answer}</p>
          </div>
        )}
      </div>
    </main>
  );
}