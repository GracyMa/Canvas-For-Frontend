
import React, { useEffect } from "react";
import styles from "../styles";
import { drawRectangle, drawCircle } from "../utils/konvaShapes";
import { DrawAction } from "../utils/konvaConstants";
import { hexagon, star, square } from "../utils/pattern";

function Canvas({
    size,
    turtleState,
    sizeEnum,
    canvasRef,
    shapes,
    currentShape,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
}) {
    const width = sizeEnum[size][0];
    const height = sizeEnum[size][1];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Iterate through shapes and draw them
        shapes.forEach((shape) => {
            switch (shape.type) {
                case "hexagon":
                    hexagon(shape, ctx);
                    break;
                case "star":
                    star(shape, ctx);
                    break;
                case "square":
                    square(shape, ctx);
                    break;
                case DrawAction.RECTANGLE:
                    drawRectangle(ctx, shape);
                    break;
                case DrawAction.CIRCLE:
                    drawCircle(ctx, shape);
                    break;
                default:
                    break;
            }
        });

            if (currentShape) {
                if (currentShape.type === DrawAction.RECTANGLE) {
                    drawRectangle(ctx, currentShape, false);
                } else if (currentShape.type === DrawAction.CIRCLE) {
                    drawCircle(ctx, currentShape, false);
                }
            }
        }
    }, [shapes, currentShape]);

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
