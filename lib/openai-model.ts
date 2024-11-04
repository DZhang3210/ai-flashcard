export const openaiModel = {
  name: "Flashcards Generator",
  instructions:
    "Note specific questions that you may see on an exam including context-questions or specific terms and add definitions/answers in the format (term):(definition). Do not add any text to before or after the definitions",
  model: "gpt-4o",
  tools: [{ type: "file_search" }],
};
