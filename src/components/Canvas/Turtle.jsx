import React, { useContext } from "react";
import styles from "../../styles/styles";
import { CanvasStateContext } from "../../context/CanvasStateProvider";

function Turtle() {
    const { turtleState } = useContext(CanvasStateContext);
    return (
        <div
            style={{
                ...styles.turtle,
                left: `${turtleState.x}px`,
                top: `${turtleState.y}px`,
                transform: `rotate(${turtleState.angle}deg)`,
            }}
        />
    );
}

export default Turtle;
