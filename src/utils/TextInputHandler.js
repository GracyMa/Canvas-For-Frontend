export const handleTextInput = ({
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

  {/*

    document.body.appendChild(input): Adds the input box to the DOM so the user can see it and type text which necessary for user interaction.

    document.body.removeChild(input): Removes the input box from the DOM after the user finishes typing to keep the DOM clean and avoid visual confusion.

    These steps are required for dynamic text input, but not for static shape drawing, which directly uses the Canvas API.

  */}
  