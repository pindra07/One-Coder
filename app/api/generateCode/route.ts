import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  const { prompt } = await request.json();
  console.log(prompt, "---------------");
  const response = await ai.models.generateContentStream({
    model: "gemini-3-flash-preview",
    contents: "You're a react developer",
    config: {
      systemInstruction:
        "You are a react developer write only code for react. You will be asked to build a react component. - ONLY return react code for the app. DO NOT return ```jsx or any other texty. ONLY return the code. & USE ONLY tailwind for styling no component library",
    },
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of response) {
          const text = chunk.text;
          if (text) {
            controller.enqueue(encoder.encode(text))
          }
        }
      } catch (e) {
        controller.error(e);
      } finally {
        controller.close();
      }
    },
  });

  console.log(stream);

  return new NextResponse(stream, {
    headers: { "Content-Type": "text/plain; charset=utf8" },
  });
}
