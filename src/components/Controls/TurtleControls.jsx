import React, { useContext, useEffect } from "react";
import { CanvasStateContext } from "../../context/CanvasStateProvider"; 
import styles from "../../styles/styles";

const MOVE_INCREMENT = 50; // Extracted constant for movement increment

function TurtleControls() {
    const { turtleState, setTurtleState, sizeEnum, size } = useContext(CanvasStateContext);

    const moveTurtle = (direction) => {
        let { x, y } = turtleState;
        // Canvas dimensions
        const canvasWidth = sizeEnum[size][0];
        const canvasHeight = sizeEnum[size][1];

        switch (direction) {
            case "left":
                x = Math.max(0, x - MOVE_INCREMENT);
                break;
            case "right":
                x = Math.min(canvasWidth, x + MOVE_INCREMENT);
                break;
            case "up":
                y = Math.max(0, y - MOVE_INCREMENT);
                break;
            case "down":
                y = Math.min(canvasHeight, y + MOVE_INCREMENT);
                break;
            default:
                break;
        }

        setTurtleState((prev) => ({
            ...prev,
            x,
            y,
        }));
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
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
        </div>
    );
}

export default TurtleControls;

