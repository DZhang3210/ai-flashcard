import Anthropic from "@anthropic-ai/sdk";

export async function POST(req) {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const { textContent, question } = await req.json();

  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: textContent,
          },
          {
            type: "text",
            text: question,
          },
        ],
      },
    ],
  });

  const responseText = msg.content[0].text;
  return Response.json({ message: responseText });
}
