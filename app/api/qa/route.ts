import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { document, question } = await req.json();

  const prompt = `You are a helpful assistant. A user has provided the following document:

---
${document}
---

Answer this question based only on the document above. Be concise.

Question: ${question}`;

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "qwen3:8b",
      prompt,
      stream: false,
    }),
  });

  const data = await response.json();

  return NextResponse.json({ answer: data.response });
}