import React, { useState } from "react";

function TextInputControls({ canvasRef, onShapesUpdate }) {
  const [text, setText] = useState(""); // State to manage input text

  const addTextToCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !text) return;

    const defaultTextShape = {
      type: "text",
      x: 50, // Default x-position
      y: 50, // Default y-position
      text: text, // User-entered text
      fontSize: 20, // Default font size
      color: "#000000", // Default color
    };

    // Draw the text on the canvas
    ctx.font = `${defaultTextShape.fontSize}px Arial`;
    ctx.fillStyle = defaultTextShape.color;
    ctx.fillText(defaultTextShape.text, defaultTextShape.x, defaultTextShape.y);

    // Add text shape to shapes state
    onShapesUpdate((prevShapes) => [...prevShapes, defaultTextShape]);

    // Reset text input
    setText("");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
        style={{
          padding: "8px",
          marginRight: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <button
        onClick={addTextToCanvas}
        style={{
          padding: "8px 12px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add Text
      </button>
    </div>
  );
}

export default TextInputControls;
