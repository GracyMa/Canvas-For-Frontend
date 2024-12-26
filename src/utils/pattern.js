

export const hexagon = (ctx, x, y, angle, length = 50) => {
    ctx.beginPath();
    ctx.moveTo(x, y); // Start at the turtle's current position

    for (let i = 0; i < 6; i++) {
        const angleInRadians = (angle * Math.PI) / 180;
        x += length * Math.cos(angleInRadians); // Calculate new x
        y += length * Math.sin(angleInRadians); // Calculate new y
        ctx.lineTo(x, y); // Draw line to the new position
        angle -= 60; // Turn left by 60 degrees for the next side
    }

    ctx.closePath(); // Close the hexagon
    ctx.stroke(); // Render the hexagon
};

export const star = (ctx, x, y, angle, length = 80) => {
    ctx.beginPath();
    ctx.moveTo(x, y); // Start at the turtle's current position

    for (let i = 0; i < 5; i++) {
        const angleInRadians = (angle * Math.PI) / 180;
        x += length * Math.cos(angleInRadians); // Calculate new x
        y += length * Math.sin(angleInRadians); // Calculate new y
        ctx.lineTo(x, y); // Draw line to the new position
        angle -= 144; // Turn left by 144 degrees for the star pattern
    }

    ctx.closePath(); // Close the star
    ctx.stroke(); // Render the star
};

export const square = (ctx, x, y, angle, length = 50) => {
    ctx.beginPath();
    ctx.moveTo(x, y); // Start at the turtle's current position

    for (let i = 0; i < 4; i++) {
        const angleInRadians = (angle * Math.PI) / 180;
        x += length * Math.cos(angleInRadians); // Calculate new x
        y += length * Math.sin(angleInRadians); // Calculate new y
        ctx.lineTo(x, y); // Draw line to the new position
        angle -= 90; // Turn left by 90 degrees for the square
    }

    ctx.closePath(); // Close the square
    ctx.stroke(); // Render the square
};

// Utility Functions for Turtle Movement
export const forward = (turtleState, setTurtleState, length) => {
    const angleInRadians = (turtleState.angle * Math.PI) / 180;
    setTurtleState((prevState) => ({
        ...prevState,
        x: prevState.x + length * Math.sin(angleInRadians),
        y: prevState.y - length * Math.cos(angleInRadians),
    }));
};

export const left = (turtleState, setTurtleState, angle) => {
    setTurtleState((prevState) => ({
        ...prevState,
        angle: prevState.angle - angle,
    }));
};

export const right = (turtleState, setTurtleState, angle) => {
    setTurtleState((prevState) => ({
        ...prevState,
        angle: prevState.angle + angle,
    }));
};