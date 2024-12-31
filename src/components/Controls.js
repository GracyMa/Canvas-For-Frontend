
import React, { useEffect } from "react";
import styles from "../styles";
import { hexagon, star, square } from "../utils/pattern";

function Controls({ turtleState, setTurtleState, canvasRef, onShapesUpdate, sizeEnum, size }) {
    const moveTurtle = (direction, length = 50) => {
        let newX = turtleState.x;
        let newY = turtleState.y;

        // Canvas dimensions
        const canvasWidth = sizeEnum[size][0];
        const canvasHeight = sizeEnum[size][1];

        switch (direction) {
            case "left":
                newX = Math.max(0, newX - length);
                break;
            case "right":
                newX = Math.min(canvasWidth, newX + length);
                break;
            case "up":
                newY = Math.max(0, newY - length);
                break;
            case "down":
                newY = Math.min(canvasHeight, newY + length);
                break;
            default:
                break;
        }


        setTurtleState({
            ...turtleState,
            x: newX,
            y: newY,
        });
    };

    // Add predefined shapes to the shapes state
    const drawPredefinedShape = (shapeFunction, type) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!ctx || !canvas) return;

        // Add predefined shape to shapes array
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
        onShapesUpdate((prevShapes) => [...prevShapes, newShape]);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    moveTurtle("left");
                    break;
                case "ArrowRight":
                    moveTurtle("right");
                    break;
                case "ArrowUp":
                    moveTurtle("up");
                    break;
                case "ArrowDown":
                    moveTurtle("down");
                    break;
                default:
                    break;
            }
        };
    // Attach the event listener for keyboard events
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener when the component unmounts
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [turtleState]);

    return (
        <div style={styles.column}>
            <h4 style={{ margin: 0 }}>TURTLE FUNCTIONS</h4>
            <div style={styles.row}>
                <button onClick={() => moveTurtle("left")} style={styles.button}>
                    ShiftLeft
                </button>
                <button onClick={() => moveTurtle("right")} style={styles.button}>
                    ShiftRight
                </button>
                <button onClick={() => moveTurtle("up")} style={styles.button}>
                    ShiftUp
                </button>
                <button onClick={() => moveTurtle("down")} style={styles.button}>
                    ShiftDown
                </button>
            </div>
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
        </div>
    );
}

export default Controls;
