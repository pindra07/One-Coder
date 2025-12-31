import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  const { prompt } = await request.json();
  console.log(prompt);
  const response = await ai.models.generateContentStream({
    model: "gemini-3-flash-preview",
    contents: "You're a react developer",
    config: {
      systemInstruction: "You are a react developer write only code for react",
    },
  });

  //   for await (const chunk of response) {
  //     console.log(chunk.text);
  // }
  return NextResponse.json(response);
}
