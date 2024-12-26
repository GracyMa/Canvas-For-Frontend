
import React from "react";
import styles from "../styles";
import { hexagon, star, square } from "../utils/pattern";

function Controls({ turtleState, setTurtleState, canvasRef }) {
    const moveTurtle = (direction, length = 50) => {
        setTurtleState((prevState) => {
            const { x, y } = prevState;
            switch (direction) {
                case "left":
                    return { ...prevState, x: x - length };
                case "right":
                    return { ...prevState, x: x + length };
                case "up":
                    return { ...prevState, y: y - length };
                case "down":
                    return { ...prevState, y: y + length };
                default:
                    return prevState;
            }
        });
    };

    const drawShape = (shape) => {
        const ctx = canvasRef.current?.getContext("2d"); // Safely access canvas context
        if (!ctx) {
            console.error("Canvas context is not available.");
            return;
        }
        const { x, y, angle } = turtleState;

        switch (shape) {
            case "hexagon":
                hexagon(ctx, x, y, angle);
                break;
            case "star":
                star(ctx, x, y, angle);
                break;
            case "square":
                square(ctx, x, y, angle);
                break;
            default:
                break;
        }
    };

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
            <h4 style={{ margin: "12px 0 0" }}>DRAW SHAPES</h4>
            <div style={{ ...styles.row, maxWidth: "100%" }}>
                {/* Hexagon Button */}
                <button
                    onClick={() => drawShape("hexagon")}
                    style={styles.blueButton}
                >
                    Hexagon
                </button>

                {/* Star Button */}
                <button
                    onClick={() => drawShape("star")}
                    style={styles.blueButton}
                >
                    Star
                </button>

                {/* Square Button */}
                <button
                    onClick={() => drawShape("square")}
                    style={styles.blueButton}
                >
                    Square
                </button>
            </div>
        </div>
    );
}

export default Controls;