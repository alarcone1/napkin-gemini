import { useState } from "react";

export default function Home() {
  // Componente principal que permite al usuario ingresar ideas, mostrarlas en una lista,
  // y luego enviar esas ideas para ser analizadas y organizadas usando Gemini.

  // Estado para almacenar la lista de ideas ingresadas por el usuario
  const [ideas, setIdeas] = useState([]);
  // Estado para manejar el valor actual del input de texto
  const [input, setInput] = useState("");
  // Estado para almacenar el resultado recibido tras analizar las ideas
  const [result, setResult] = useState("");

  /**
   * Función para agregar una nueva idea a la lista.
   * Verifica que el input no esté vacío o solo contenga espacios,
   * luego agrega la idea al estado 'ideas' y limpia el input.
   */
  const addIdea = () => {
    if (input.trim()) {
      setIdeas([...ideas, input.trim()]);
      setInput("");
    }
  };

  /**
   * Función asíncrona que envía las ideas al endpoint '/api/analyze'
   * para que sean procesadas y organizadas por Gemini.
   * Una vez recibido el resultado, actualiza el estado 'result'.
   */
  const analyzeIdeas = async () => {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ideas }),
    });
    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>📝 Napkin IA con Gemini</h1>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe una idea..."
        />
        <button onClick={addIdea}>Agregar</button>
      </div>

      <h3>Ideas:</h3>
      <ul>
        {ideas.map((idea, idx) => (
          <li key={idx}>{idea}</li>
        ))}
      </ul>

      <button onClick={analyzeIdeas} disabled={!ideas.length}>
        Organizar con Gemini
      </button>

      {result && (
        <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
          <h3>Resultado:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}