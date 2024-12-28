
import React, { useEffect } from "react";
import styles from "../styles";
import { drawRectangle, drawCircle } from "../utils/konvaShapes";
import { DrawAction } from "../utils/konvaConstants"; // 引入 DrawAction 枚举

function Canvas({
    size,
    turtleState,
    sizeEnum,
    canvasRef,
    shapes,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
}) {
    const width = sizeEnum[size][0];
    const height = sizeEnum[size][1];

    // Draw shapes on canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");

            // Clear the entire canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Redraw all shapes from the shapes array
            shapes.forEach((shape) => {
                if (shape.type === DrawAction.RECTANGLE) {
                    drawRectangle(ctx, shape);
                } else if (shape.type === DrawAction.CIRCLE) {
                    drawCircle(ctx, shape);
                }
            });
        }
    }, [shapes]); // Re-run when shapes change

    return (
        <div
            style={{
                ...styles.canvasWrapper,
                width: width + 2,
                height: height + 2,
            }}
        >
            <div
                style={{
                    ...styles.turtle,
                    left: `${turtleState.x}px`,
                    top: `${turtleState.y}px`,
                    transform: `rotate(${turtleState.angle}deg)`,
                }}
            />

            <canvas
                ref={canvasRef}
                id="myDrawing"
                width={width}
                height={height}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
        </div>
    );
}

export default Canvas;
