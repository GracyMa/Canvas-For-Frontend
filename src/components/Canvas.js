
import React, { useEffect, useRef } from "react";
import styles from "../styles";

function Canvas({ size, turtleState, sizeEnum, canvasRef }) {
    // const canvasRef = useRef(null);
    const width = sizeEnum[size][0];
    const height = sizeEnum[size][1];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = turtleState.penColor;
            ctx.beginPath();
            ctx.fill();
        }
    }, [turtleState]);

    return (
        <div style={{ ...styles.canvasWrapper, width: width + 2, height: height + 2 }}>
            <div
                style={{
                    ...styles.turtle,
                    left: `${turtleState.x}px`,
                    top: `${turtleState.y}px`,
                    transform: `rotate(${turtleState.angle}deg)`,
                }}
            />
            <canvas ref={canvasRef} id="myDrawing" width={width} height={height} />
        </div>
    );
}

export default Canvas;
