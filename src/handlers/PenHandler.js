import { useContext } from "react";
import { CanvasStateContext } from "../context/CanvasStateProvider";

export const usePenDrawingHandlers = () => {
    const { drawAction, penColor, canvasRef, setShapes } = useContext(CanvasStateContext); // Fetch from context

    let penPath = []; // Tracks the current pen stroke path

    const handleMouseDown = (e) => {
        if (drawAction !== "pen") return;

        const { offsetX, offsetY } = e.nativeEvent;
        penPath = [[offsetX, offsetY]];
    };

    const handleMouseMove = (e) => {
        if (drawAction !== "pen" || penPath.length === 0) return;

        const { offsetX, offsetY } = e.nativeEvent;
        penPath.push([offsetX, offsetY]);
        drawPath(canvasRef, penPath, penColor); // Draw in real time with selected color
    };

    const handleMouseUp = () => {
        if (drawAction !== "pen" || penPath.length === 0) return;

        const newPenShape = {
            type: "pen",
            path: [...penPath],
            color: penColor,
            lineWidth: 2,
        };
        setShapes((prevShapes) => [...prevShapes, newPenShape]);
        penPath = [];
    };

    const drawPath = (canvasRef, path, color) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        path.forEach(([x, y], index) => {
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();
    };

    return {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
    };
};