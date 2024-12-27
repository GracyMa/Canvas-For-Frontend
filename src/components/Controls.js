
import React from "react";
import styles from "../styles";
import { hexagon, star, square } from "../utils/pattern";

function Controls({ turtleState, setTurtleState }) {
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

    // Turtle object for drawing shapes
    const turtle = {
        forward: (length, ctx) => {
            const angleInRadians = (turtleState.angle * Math.PI) / 180;

            const newX = turtleState.x + length * Math.sin(angleInRadians);
            const newY = turtleState.y - length * Math.cos(angleInRadians);

            if (turtleState.penDown) {
                // Draw a line from the current position to the new position
                ctx.beginPath(); // Start a new path (only for this line)
                ctx.moveTo(turtleState.x, turtleState.y);
                ctx.lineTo(newX, newY);
                ctx.strokeStyle = turtleState.penColor;
                ctx.lineWidth = turtleState.lineWidth;
                ctx.stroke(); // Render the line
            }

            // Update the turtle's position without resetting the canvas
            turtleState.x = newX;
            turtleState.y = newY;
        },
        left: (angle) => {
            turtleState.angle += angle; // Update the turtle's angle
        },
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
            <div style={styles.row}>
                <button
                    onClick={() => {
                        const canvas = document.getElementById("myDrawing");
                        const ctx = canvas.getContext("2d");
                        hexagon(turtle, ctx); // Draw a hexagon
                    }}
                    style={styles.blueButton}
                >
                    Hexagon
                </button>
                <button
                    onClick={() => {
                        const canvas = document.getElementById("myDrawing");
                        const ctx = canvas.getContext("2d");
                        star(turtle, ctx); // Draw a star
                    }}
                    style={styles.blueButton}
                >
                    Star
                </button>
                <button
                    onClick={() => {
                        const canvas = document.getElementById("myDrawing");
                        const ctx = canvas.getContext("2d");
                        square(turtle, ctx); // Draw a square
                    }}
                    style={styles.blueButton}
                >
                    Square
                </button>
            </div>
        </div>
    );
}

export default Controls;