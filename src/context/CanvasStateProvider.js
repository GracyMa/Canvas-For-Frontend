import React, { createContext, useState, useEffect, useRef } from "react";
import { DrawAction, sizeEnum } from "../utils/constants";

// Create context
export const CanvasStateContext = createContext();
// Provide context to children
export const CanvasStateProvider = ({ children }) => {
    const [turtleState, setTurtleState] = useState({
        x: sizeEnum.small[0] / 2,
        y: sizeEnum.small[1] / 2,
        angle: 0,
        penDown: true,
        penColor: "#000000",
        lineWidth: 2,
    });

    const [size, setSize] = useState("small");
    const [drawAction, setDrawAction] = useState(DrawAction.RECTANGLE);
    const [shapes, setShapes] = useState([]);
    const [isTextMode, setIsTextMode] = useState(false);
    const [penColor, setPenColor] = useState("#000000");
    const [currentShape, setCurrentShape] = useState(null);

    // Canvas ref to access canvas DOM element
    const canvasRef = useRef(null);
    // Dynamically update turtle position when the canvas size changes
    useEffect(() => {
        setTurtleState((prev) => ({
            ...prev,
            x: sizeEnum[size][0] / 2,
            y: sizeEnum[size][1] / 2,
        }));
    }, [size]);
    
    // Clear Canvas function
    const resetCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        setShapes([]);
        setTurtleState({
            x: sizeEnum[size][0] / 2,
            y: sizeEnum[size][1] / 2,
            angle: 0,
            penDown: true,
            penColor: "#000000",
            lineWidth: 2,
        });
    };

    return (
         // Provide state and functions via context
        <CanvasStateContext.Provider
            value={{
                size,
                setSize,
                sizeEnum,
                turtleState,
                setTurtleState,
                shapes,
                setShapes,
                drawAction,
                setDrawAction,
                isTextMode, 
                setIsTextMode,
                penColor, 
                setPenColor,
                currentShape, 
                setCurrentShape,
                resetCanvas,
                canvasRef,
            }}
        >
            {children}
        </CanvasStateContext.Provider>
    );
};
