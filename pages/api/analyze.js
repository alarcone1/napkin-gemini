// Este archivo define un endpoint API que procesa una lista de ideas usando Gemini (Google Generative AI).
// Recibe un arreglo de ideas mediante una petición POST, las organiza y clasifica usando un modelo de IA,
// y retorna el resultado procesado o un mensaje de error.

import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    // Validación de método: solo se permite el método POST.
    if (req.method !== "POST") {
        // Si el método no es POST, retorna un error 405 (Método no permitido).
        return res.status(405).json({ error: "Método no permitido" });
    }

    try {
        // Extracción del arreglo de ideas desde el body de la petición.
        const { ideas } = req.body;

        // Inicialización de la API de Google Generative AI con la clave de entorno.
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Selección del modelo "gemini-1.5-flash".
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Construcción del prompt: se pide organizar, clasificar y resumir las ideas recibidas.
        const prompt = `
    Organiza y clasifica las siguientes ideas en categorías,
    encuentra conexiones entre ellas y genera un resumen general:
    ${ideas.join(", ")}
    `;

        // Envío del prompt al modelo y espera de la respuesta generada.
        const result = await model.generateContent(prompt);

        // Retorna el resultado generado por Gemini en caso de éxito.
        res.status(200).json({ result: result.response.text() });
    } catch (error) {
        // En caso de error, se imprime en consola y se retorna un mensaje de error al cliente.
        console.error("Error en Gemini:", error);
        res.status(500).json({ error: "Error procesando ideas con Gemini" });
    }
}