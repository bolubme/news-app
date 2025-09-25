import OpenAI from 'openai';

// Initialize the OpenAI client
const client = new OpenAI({ apiKey: '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' });

// Function to summarize an article with longer output
export async function summarizeArticle(article) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a news summarizer." },
        {
          role: "user",
          content:
            "Can you provide an in-depth summary of this news article? The summary must include key details, relevant background information, and your analysis of the situation. ",
        },
        { role: "assistant", content: article },
      ],
    });

    // Concatenate the responses to generate a longer summary
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}