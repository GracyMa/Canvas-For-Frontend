import { useContext, useState } from "react";
import { DrawShape } from "../utils/constants";
import { CanvasStateContext } from "../context/CanvasStateProvider";

const DrawingHandlers = ({ onShapesUpdate }) => {
    const { drawAction } = useContext(CanvasStateContext);
    const [currentShape, setCurrentShape] = useState(null);

    const handleMouseDown = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;

        // Determine the shape type based on the current drawAction
        switch (drawAction) {
            case DrawShape.RECTANGLE:
                setCurrentShape({
                    type: DrawShape.RECTANGLE,
                    x: offsetX,
                    y: offsetY,
                    width: 0,
                    height: 0,
                    color: "#000000",
                });
                break;

            case DrawShape.CIRCLE:
                setCurrentShape({
                    type: DrawShape.CIRCLE,
                    x: offsetX,
                    y: offsetY,
                    radius: 0,
                    color: "#000000",
                });
                break;
        }
    };

    const handleMouseMove = (e) => {
        if (!currentShape) return;

        const { offsetX, offsetY } = e.nativeEvent;

        // Update the shape properties based on its type
        switch (currentShape.type) {
            case DrawShape.RECTANGLE:
                setCurrentShape((prev) => ({
                    ...prev,
                    width: offsetX - prev.x,
                    height: offsetY - prev.y,
                }));
                break;

            case DrawShape.CIRCLE:
                setCurrentShape((prev) => ({
                    ...prev,
                    radius: Math.sqrt(
                        Math.pow(offsetX - prev.x, 2) + Math.pow(offsetY - prev.y, 2)
                    ),
                }));
                break;
        }
    };

    const handleMouseUp = () => {
        if (currentShape) {
            // Add the finalized shape to the parent component's shape list
            onShapesUpdate((prevShapes) => [...prevShapes, currentShape]);
        }
        // Clear the current shape state
        setCurrentShape(null);
    };

    return {
        handleMouseDown, // Start drawing
        handleMouseMove, // Update drawing
        handleMouseUp,   // Finalize drawing
        currentShape,    // Expose the current shape for real-time drawing
    };
}

export default DrawingHandlers;
