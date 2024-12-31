
import React, { useState, useRef } from "react";
import Header from "./components/Header";
import Canvas from "./components/Canvas";
import Controls from "./components/Controls";
import styles from "./styles";
import { useKonvaCanvasHandlers } from "./components/KonvaCanvas";
import { DrawAction } from "./utils/konvaConstants"; 

function App() {
    // Enum for canvas sizes
    const sizeEnum = {
        small: [800, 480],
        medium: [1024, 576],
        large: [1280, 720],
        absoluteUnit: [1920, 1080],
    };

    // Manages Shared State
    const [turtleState, setTurtleState] = useState({
        x: 360,
        y: 200,
        angle: 0,
        penDown: true,
        penColor: "#000000",
        lineWidth: 2,
    });
    const [size, setSize] = useState("small");
    const canvasRef = useRef(null);

    // Konva-specific state
    const [drawAction, setDrawAction] = useState(DrawAction.RECTANGLE); // Default to rectangle
    const [shapes, setShapes] = useState([]); // Stores finalized shapes

    // Import handlers from KonvaCanvas
    const {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        currentShape, // Current shape being drawn
    } = useKonvaCanvasHandlers({
        drawAction,
        onShapesUpdate: setShapes,
    });

    // Provide reset function and pass to button
    const resetCanvas = () => {
        // Clear the canvas only when click on reset canvas button
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
        }
        // Clear shapes
        setShapes([]);
        // Reset the turtle state
        setTurtleState({
            x: 360,
            y: 200,
            angle: 0,
            penDown: true,
            penColor: "#000000",
            lineWidth: 2,
        });
    };

    return (
        <div style={styles.column}>
            {/* Pass sizeEnum to Header */}
            <Header size={size} setSize={setSize} sizeEnum={sizeEnum} />
            <button onClick={resetCanvas} style={styles.button}>
                Reset Canvas
            </button>
            {/* Pass sizeEnum to Canvas */}
            <Canvas 
                size={size} 
                sizeEnum={sizeEnum} 
                turtleState={turtleState} 
                canvasRef={canvasRef}
                shapes={shapes}
                currentShape={currentShape} // Pass currentShape for real-time rendering
                handleMouseDown={handleMouseDown}
                handleMouseMove={handleMouseMove}
                handleMouseUp={handleMouseUp} 
            />
            <Controls
                turtleState={turtleState}
                setTurtleState={setTurtleState}
                canvasRef={canvasRef}
                onShapesUpdate={setShapes}
            />
            <div>
                <button 
                    onClick={() => setDrawAction(DrawAction.RECTANGLE)} 
                    style={styles.button}
                >
                    Rectangle
                </button>
                <button 
                    onClick={() => setDrawAction(DrawAction.CIRCLE)} 
                    style={styles.button}
                >
                    Circle
                </button>
            </div>
        </div>
    );
}

export default App;
