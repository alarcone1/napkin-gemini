import { useState } from "react";

export default function Home() {
  const [ideas, setIdeas] = useState([]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const addIdea = () => {
    if (input.trim()) {
      setIdeas([...ideas, input.trim()]);
      setInput("");
    }
  };

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