
import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { drawRectangle, drawCircle } from "../../utils/shapes";
import { DrawAction } from "../../utils/constants";
import { hexagon, star, square } from "../../utils/pattern";
import useTextInputHandler from "../../utils/useTextInputHandler";

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
    setShapes,
    isTextMode, // Receive text mode toggle
}) {
    const width = sizeEnum[size][0];
    const height = sizeEnum[size][1];
    const [hasInput, setHasInput] = useState(false);

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
                    case "text":
                        ctx.font = shape.font || "16px Arial";
                        ctx.fillStyle = shape.color || "#000000";
                        ctx.fillText(shape.text, shape.x, shape.y);
                        break;
                        case "pen": // Handle pen paths
                        ctx.strokeStyle = shape.color;
                        ctx.lineWidth = shape.lineWidth || 2;
                        ctx.beginPath();
                        shape.path.forEach(([x, y], index) => {
                            if (index === 0) ctx.moveTo(x, y);
                            else ctx.lineTo(x, y);
                        });
                        ctx.stroke();
                        break;
                    default:
                        break;
                }
            });

            // Draw current shape
            if (currentShape) {
                if (currentShape.type === DrawAction.RECTANGLE) {
                    drawRectangle(ctx, currentShape, false);
                } else if (currentShape.type === DrawAction.CIRCLE) {
                    drawCircle(ctx, currentShape, false);
                }
            }
        }
    }, [shapes, currentShape]);

    const handleCanvasClick = (e) => {
        if (isTextMode) {
            useTextInputHandler({ canvasRef, setShapes, setHasInput, hasInput })(e);
        }
    };

    
    return (
        <div style={{
            ...styles.canvasWrapper,
            width: width + 2,
            height: height + 2
        }}>
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
                onClick={handleCanvasClick} // Add click event for text input
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
        </div>
    );
}

export default Canvas;
