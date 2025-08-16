import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    try {
        const { ideas } = req.body;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
    Organiza y clasifica las siguientes ideas en categorías,
    encuentra conexiones entre ellas y genera un resumen general:
    ${ideas.join(", ")}
    `;

        const result = await model.generateContent(prompt);

        res.status(200).json({ result: result.response.text() });
    } catch (error) {
        console.error("Error en Gemini:", error);
        res.status(500).json({ error: "Error procesando ideas con Gemini" });
    }
}