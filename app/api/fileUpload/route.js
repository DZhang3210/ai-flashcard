import Anthropic from "@anthropic-ai/sdk";

export async function POST(req) {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  console.log("req", req);
  const { pdfBase64, question } = await req.json();

  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [
      {
        content: [
          {
            type: "document",
            source: {
              media_type: "application/pdf",
              type: "base64",
              data: pdfBase64,
            },
            cache_control: { type: "ephemeral" },
          },
          {
            type: "text",
            text: question,
          },
        ],
        role: "user",
      },
    ],
  });

  const responseText = msg.content[0].text;
  return Response.json({ message: responseText });
}
