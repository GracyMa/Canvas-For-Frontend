

export const drawingHandler = ({ drawAction, onShapesUpdate }) => {
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

            default:
                console.warn(`Unsupported drawAction: ${drawAction}`);
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

export const textInputHandler = ({
    canvasRef,
    setShapes,
    setHasInput,
    hasInput, // State to track if an input box is already active
  }) => {
    return (e) => {
      if (hasInput) return; // Prevent multiple input boxes from being created
  
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect(); // Get the canvas's bounding rectangle
        const x = e.clientX - rect.left; // Mouse X relative to canvas
        const y = e.clientY - rect.top; // Mouse Y relative to canvas
  
      // Dynamically create an input box at the mouse position
      const input = document.createElement("input");
      input.type = "text";
      input.style.position = "absolute";
      input.style.left = `${e.clientX}px`;
      input.style.top = `${e.clientY}px`;
      input.style.font = "14px Arial";
  
      // Use the Enter key to finalize the text input
      input.onkeydown = (event) => {
        if (event.key === "Enter") {
          const newText = {
            type: "text",
            text: input.value,
            x: x,
            y: y,
            font: "14px Arial",
            color: "#000",
          };
          setShapes((prevShapes) => [...prevShapes, newText]); // Add to shape array
          document.body.removeChild(input); // Removes the input box from the DOM after text done
          setHasInput(false);// Reset state to false
        }
      };
  
      document.body.appendChild(input); //Add the dynamically created input box to the DOM
      input.focus(); // Ensures the user can immediately type in the input box
      setHasInput(true); // Update state to ensure single active input box at a time
    };
  };

