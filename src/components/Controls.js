
import React, { useEffect } from "react";
import styles from "../styles";
import { hexagon, star, square } from "../utils/pattern";

function Controls({ turtleState, setTurtleState, canvasRef }) {
    const moveTurtle = (direction, length = 50) => {
        // Calculate the new position based on the direction
        let newX = turtleState.x;
        let newY = turtleState.y;

        switch (direction) {
            case "left":
                newX -= length;
                break;
            case "right":
                newX += length;
                break;
            case "up":
                newY -= length;
                break;
            case "down":
                newY += length;
                break;
            default:
                break;
        }

        // Update Turtle location
        setTurtleState({
            ...turtleState,
            x: newX,
            y: newY,
        });
    };

    // Keyboard event listening, also call moveTurtle to update location
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
        //// Attach the event listener for keyboard events
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
                    onClick={() => {
                        const canvas = canvasRef.current;
                        const ctx = canvas?.getContext("2d");
                        hexagon(turtleState, ctx);
                    }}
                    style={styles.blueButton}
                >
                    Hexagon
                </button>
                <button
                    onClick={() => {
                        const canvas = canvasRef.current;
                        const ctx = canvas?.getContext("2d");
                        star(turtleState, ctx);
                    }}
                    style={styles.blueButton}
                >
                    Star
                </button>
                <button
                    onClick={() => {
                        const canvas = canvasRef.current;
                        const ctx = canvas?.getContext("2d");
                        square(turtleState, ctx);
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
