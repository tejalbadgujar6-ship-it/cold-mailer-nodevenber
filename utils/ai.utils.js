
import axios from "axios";

const OPENROUTER_API_URL =
    "https://openrouter.ai/api/v1/chat/completions";

export const extractWithNvidia = async (
    prompt,
    imageData = null
) => {
    // 1. Get API key from .env
    const apiKey = process.env.OPENROUTER_API_KEY?.trim();

    if (!apiKey) {
        throw new Error(
            "OPENROUTER_API_KEY is missing. Check your .env file."
        );
    }

    // 2. Prepare message content
    const content = [
        {
            type: "text",
            text: prompt
        }
    ];

    // 3. Add image if provided
    if (imageData) {
        content.push({
            type: "image_url",
            image_url: {
                url: imageData
            }
        });
    }

    try {
        // 4. Send request to OpenRouter
        const response = await axios.post(
            OPENROUTER_API_URL,
            {
                model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",

                messages: [
                    {
                        role: "user",
                        content: content
                    }
                ],

                temperature: 0.2,
                max_tokens: 2000,
                stream: false
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                timeout: 120000
            }
        );

        // 5. Get AI response
        const aiContent =
            response.data?.choices?.[0]?.message?.content;

        if (!aiContent) {
            throw new Error(
                "No content received from OpenRouter API."
            );
        }

        // Handle string or array response formats
        if (typeof aiContent === "string") {
            return aiContent;
        }

        if (Array.isArray(aiContent)) {
            return aiContent
                .filter(item => item.type === "text")
                .map(item => item.text || "")
                .join("\n");
        }

        throw new Error("Unexpected AI response format.");

    } catch (error) {
        console.error(
            "OpenRouter status:",
            error.response?.status
        );

        console.error(
            "OpenRouter response:",
            error.response?.data || error.message
        );

        throw error;
    }
};
