export async function generateGeminiResponse(userMessage) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return {
      error: true,
      message: "Missing Gemini API key in .env",
    };
  }

  try {
    const result = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userMessage }],
            },
          ],
        }),
      }
    );

    const data = await result.json();

    if (data.error) {
      return {
        error: true,
        message: data.error.message || "Gemini API error",
      };
    }

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "(No response from Gemini)";

    return { error: false, text };
  } catch (err) {
    return {
      error: true,
      message: "Network/Server error",
    };
  }
}