"use client"
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("")

  async function generateCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const res = await fetch("/api/generateCode", {
      method: "POST",
      body: JSON.stringify({prompt})
    })
    console.log(res)
  }
  return (
    <div className="mx-auto max-w-5xl mt-20 space-y-4">
      <h1 className="font-bold text-3xl">LLama Coder</h1>
      <pre>Generate landing page with one click...</pre>
      <form onSubmit={generateCode}>
      <input
        value={prompt}
        type="text"
        onChange={(e)=> setPrompt(e.target.value)}
        placeholder="put in your prompt"
        className="border p-2 rounded-md"
      />
      </form>
    </div>
  );
}
