
import React, { useState, useRef } from "react";
import Header from "./components/Header";
import Canvas from "./components/Canvas";
import Controls from "./components/Controls";
import styles from "./styles";

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

    // Provide reset function and pass to button
    const resetCanvas = () => {
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
                canvasRef={canvasRef} />
            <Controls
                turtleState={turtleState}
                setTurtleState={setTurtleState}
                canvasRef={canvasRef} // Pass canvasRef here
            />
        </div>
    );
}

export default App;