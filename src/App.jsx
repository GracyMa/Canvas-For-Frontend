
import React, { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import Canvas from "./components/Canvas/Canvas";
import Controls from "./components/Controls/Controls";
import styles from "./styles/styles";
import usePenDrawingHandlers from "./utils/usePenDrawingHandlers";
import useDrawingHandlers from "./utils/useDrawingHandlers";
import { DrawAction } from "./utils/constants";

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
        // Calculating the center point of the canvas
        x: sizeEnum.small[0] / 2, // retrieves width
        y: sizeEnum.small[1] / 2, // retrieves height
        angle: 0,
        penDown: true,
        penColor: "#000000",
        lineWidth: 2,
    });
    const [size, setSize] = useState("small");
    const canvasRef = useRef(null);
    const [drawAction, setDrawAction] = useState(DrawAction.RECTANGLE); // Default to rectangle
    const [shapes, setShapes] = useState([]); // Stores finalized shapes
    const [isTextMode, setIsTextMode] = useState(false); // Text mode toggle
    const [penColor, setPenColor] = useState("#000000"); // Default pen color



    const {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        currentShape, // Current shape being drawn
    } = useDrawingHandlers({
        drawAction,
        onShapesUpdate: setShapes,
    });

    const penHandlers = usePenDrawingHandlers({
        canvasRef,
        setShapes,
        drawAction,
        penColor,
    });
    // Dynamically update the turtle position when the size changes
    useEffect(() => {
        setTurtleState((prev) => ({
            ...prev,
            x: sizeEnum[size][0] / 2,
            y: sizeEnum[size][1] / 2,
        }));
    }, [size]);

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
            x: sizeEnum[size][0] / 2,
            y: sizeEnum[size][1] / 2,
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
                // handleMouseDown={handleMouseDown}
                // handleMouseMove={handleMouseMove}
                // handleMouseUp={handleMouseUp}
                setShapes={setShapes} // Pass setShapes to Canvas
                isTextMode={isTextMode} // Pass text mode state
                handleMouseDown={(e) => {
                    penHandlers.handleMouseDown(e);
                    handleMouseDown(e);
                }}
                handleMouseMove={(e) => {
                    penHandlers.handleMouseMove(e);
                    handleMouseMove(e);
                }}
                handleMouseUp={(e) => {
                    penHandlers.handleMouseUp(e);
                    handleMouseUp(e);
                }}
            />
            <Controls
                turtleState={turtleState}
                setTurtleState={setTurtleState}
                canvasRef={canvasRef}
                onShapesUpdate={setShapes}
                sizeEnum={sizeEnum} // Add sizeEnum
                size={size} // Add size
            />
            <div>
                <button
                    onClick={() => {
                        setDrawAction(DrawAction.RECTANGLE);
                        setIsTextMode(false); // Disable text mode when drawing shapes
                    }}
                    style={styles.button}
                >
                    Rectangle
                </button>
                <button
                    onClick={() => {
                        setDrawAction(DrawAction.CIRCLE);
                        setIsTextMode(false); 
                    }}
                    style={styles.button}
                >
                    Circle
                </button>
                <button
                    onClick={() => {
                        setIsTextMode(true); // Enable text mode
                        setDrawAction(null); // Disable shape drawing
                    }}
                    style={styles.button}
                >
                    Add Text
                </button>
                <button
                    onClick={() => {
                        setDrawAction("pen");
                        setIsTextMode(false); 
                    }}
                    style={styles.button}
                >
                    Pen
                </button>
                <input
                    type="color"
                    value={penColor}
                    onChange={(e) => setPenColor(e.target.value)}
                    style={styles.colorPicker}
                />
            </div>
        </div>
    );
}

export default App;
