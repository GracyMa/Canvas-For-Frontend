import React, { useContext } from "react";
import styles from "../../styles/styles";
import { CanvasStateContext } from "../../context/CanvasStateProvider";
import { hexagon, star, square } from "../../handlers/PreDefinedShapeHandler";

function ShapeControls() {
  const { canvasRef, turtleState, setShapes } = useContext(CanvasStateContext);

  const drawPredefinedShape = (shapeFunction, type) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    // Define the new shape properties based on the turtle's current state
    const newShape = {
      type,
      x: turtleState.x,
      y: turtleState.y,
      angle: turtleState.angle,
      color: turtleState.penColor,
      lineWidth: turtleState.lineWidth,
      length: 50,
    };
    shapeFunction(newShape, ctx);
    setShapes((prevShapes) => [...prevShapes, newShape]);
  };

  return (
    <div style={styles.row}>
      <button
        onClick={() => drawPredefinedShape(hexagon, "hexagon")}
        style={styles.blueButton}
      >
        Hexagon
      </button>
      <button
        onClick={() => drawPredefinedShape(star, "star")}
        style={styles.blueButton}
      >
        Star
      </button>
      <button
        onClick={() => drawPredefinedShape(square, "square")}
        style={styles.blueButton}
      >
        Square
      </button>
    </div>
  );
}

export default ShapeControls;
