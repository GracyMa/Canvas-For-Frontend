import React, { useEffect, useContext, useState } from "react";
import styles from "../../styles/styles";
import { CanvasStateContext } from "../../context/CanvasStateProvider";
import { drawRectangle, drawCircle } from "../../handlers/RealTimeShapeHandlers";
import { hexagon, star, square } from "../../handlers/PreDefinedShapeHandler";
import { handleTextInput } from "../../handlers/TextHandler";
import { DrawShape } from "../../utils/constants";
import { usePenDrawingHandlers } from "../../handlers/PenHandler";
import DrawingHandlers from "../../handlers/DrawingHandlers";
import Turtle from "./Turtle";

function Canvas() {
    // Get shared states from context
    const {
        size,
        sizeEnum,
        canvasRef,
        shapes,
        drawAction,
        isTextMode,
        setShapes,
        penColor,
    } = useContext(CanvasStateContext);

    // Set local state
    const [hasInput, setHasInput] = useState(false);
    const width = sizeEnum[size][0];
    const height = sizeEnum[size][1];

    // Handlers for shape drawing logic
    const {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        currentShape,
    } = DrawingHandlers({
        onShapesUpdate: setShapes,
    });
    // Handlers for pen drawing logic
    const penHandlers = usePenDrawingHandlers();

    // Effect to render the canvas whenever shapes or current shape change
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw each shape from the shapes array
            shapes.forEach((shape) => {
                switch (shape.type) {
                    case DrawShape.HEXAGON:
                        hexagon(shape, ctx);
                        break;
                    case DrawShape.STAR:
                        star(shape, ctx);
                        break;
                    case DrawShape.SQUARE:
                        square(shape, ctx);
                        break;
                    case DrawShape.RECTANGLE:
                        drawRectangle(ctx, shape);
                        break;
                    case DrawShape.CIRCLE:
                        drawCircle(ctx, shape);
                        break;
                    case "text":
                        ctx.font = shape.font || "16px Arial";
                        ctx.fillStyle = shape.color || "#000000";
                        ctx.fillText(shape.text, shape.x, shape.y);
                        break;
                    case "pen":
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

            // Draw the currently active shape for real-time visualization
            if (currentShape) {
                if (currentShape.type === DrawShape.RECTANGLE) {
                    drawRectangle(ctx, currentShape, false);
                } else if (currentShape.type === DrawShape.CIRCLE) {
                    drawCircle(ctx, currentShape, false);
                }
            }
        }
    }, [shapes, currentShape]);// Dependency array ensures re-render only when these change

    // Handle click events on the canvas for text input
    const handleCanvasClick = (e) => {
        if (isTextMode) {
            handleTextInput({ canvasRef, setShapes, setHasInput, hasInput })(e);
        }
    };

    return (
        <div
            style={{
                ...styles.canvasWrapper,
                width: width + 2,
                height: height + 2,
            }}
        >
            <Turtle />
            <canvas
                ref={canvasRef} // Reference to the canvas DOM element
                id="myDrawing"
                width={width}
                height={height}
                onClick={handleCanvasClick} // Add click event for text input
                onMouseDown={(e) => {
                    penHandlers.handleMouseDown(e);
                    handleMouseDown(e);
                }}
                onMouseMove={(e) => {
                    penHandlers.handleMouseMove(e);
                    handleMouseMove(e);
                }}
                onMouseUp={(e) => {
                    penHandlers.handleMouseUp(e);
                    handleMouseUp(e);
                }}
            />
        </div>
    );
}

export default Canvas;
