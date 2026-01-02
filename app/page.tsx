"use client"
import { useState } from "react";
import { Sandpack } from "@codesandbox/sandpack-react";
import { freeCodeCampDark } from "@codesandbox/sandpack-themes";


export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")

  async function generateCode(e: React.FormEvent<HTMLFormElement>) {
    setGeneratedCode("")
    e.preventDefault()
    const res = await fetch("/api/generateCode", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({prompt})
    })
    console.log(res.body)
    const reader = res.body?.getReader();
    const decoder = new TextDecoder()

    while(true) {
      //@ts-ignore
      const {value, done} = await reader?.read();
      if(done) {
        break;
      }

      const chunk = decoder.decode(value, {stream: true});
      setGeneratedCode((prev) => prev + chunk)
    }
  }
  return (
    <div className="mx-auto max-w-5xl mt-20 space-y-4">
      <h1 className="font-bold text-3xl">One Coder</h1>
      <pre>Generate landing page with one click...</pre>
      <form onSubmit={generateCode}>
      <input
        value={prompt}
        type="text"
        onChange={(e)=> setPrompt(e.target.value)}
        placeholder="put in your prompt"
        className="border p-2 rounded-md"
      />
      <button className="text-white bg-black m-3 p-2 rounded-lg cursor-pointer ">Submit</button>
      </form>
      <Sandpack 
      theme={freeCodeCampDark}
      template="react-ts"
      files={{
        "/App.tsx": generatedCode
      }} 
      />
    </div>
  );
}
