import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { prompt } = await request.json();
  console.log(prompt);
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a react developer" },
      { role: "user", content: prompt },
    ],
    stream: true
  });
  console.log(response)
  return NextResponse.json({ message: response });
}
