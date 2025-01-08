import { useState } from "react";
import { DrawAction } from "../utils/constants";

const DrawingHandlers =({ drawAction, onShapesUpdate }) => {
    const [currentShape, setCurrentShape] = useState(null); 

    const handleMouseDown = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        
        // Determine the shape type based on the current drawAction
        switch (drawAction) {
            case DrawAction.RECTANGLE:
                setCurrentShape({
                    type: DrawAction.RECTANGLE,
                    x: offsetX,
                    y: offsetY,
                    width: 0,
                    height: 0,
                    color: "#000000",
                });
                break;

            case DrawAction.CIRCLE:
                setCurrentShape({
                    type: DrawAction.CIRCLE,
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
            case DrawAction.RECTANGLE:
                setCurrentShape((prev) => ({
                    ...prev,
                    width: offsetX - prev.x,
                    height: offsetY - prev.y,
                }));
                break;

            case DrawAction.CIRCLE:
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
