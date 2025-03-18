import { NextResponse } from "next/server";
import OpenAI from "openai";
import axios from "axios";
import { openaiModel } from "@/lib/openai-model";
import { AssistantCreateParams } from "openai/resources/beta/assistants.mjs";

// Initialize the configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function fetchTextFileContent(url: string) {
  const response = await axios.get(url);
  return response.data; // Returns the text content directly
}

export async function POST(req: Request) {
  try {
    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }
    const body = await req.json();
    const { textUrl }: { textUrl: string } = body;

    const assistant = await openai.beta.assistants.create(
      openaiModel as AssistantCreateParams
    );

    // Fetch text content
    const textContent = await fetchTextFileContent(textUrl);

    // Create a file from the text content
    const file = await openai.files.create({
      file: new File([textContent], "text.txt", { type: "text/plain" }),
      purpose: "assistants",
    });

    const thread = await openai.beta.threads.create({
      messages: [
        {
          role: "user",
          content:
            "Note specific questions that you may see on an exam including context-questions or specific terms and add definitions/answers in the format (term):(definition). Do not add any text to before or after the definitions",
          attachments: [{ file_id: file.id, tools: [{ type: "file_search" }] }],
        },
      ],
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
    });

    // Poll for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);

    while (runStatus.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    // Get messages
    const messages = await openai.beta.threads.messages.list(thread.id);
    const lastMessage = messages.data[0];

    return NextResponse.json({
      message:
        lastMessage.content[0].type === "text"
          ? lastMessage.content[0].text.value
          : null,
    });
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
