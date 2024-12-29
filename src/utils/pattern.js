

export const hexagon = (turtleState, ctx, length = 50) => {
    for (let i = 1; i <= 6; i++) {  // Draw each side of the hexagon
        forward(turtleState, ctx, length); // Use the turtle to draw forward
        left(turtleState, 60); // Rotate the turtle left by 60 degrees
    }
};

export const star = (turtleState, ctx) => {
    for (let i = 0; i < 18; i++) {  // Draw each segment of the star
        forward(turtleState, ctx, 80); 
        left(turtleState, 100); // Rotate the turtle left by 100 degrees
    }
};

// Add a new shape square
export const square = (turtleState, ctx, length = 50) => {
    for (let i = 0; i < 4; i++) {  // Draw each side of square 
        forward(turtleState, ctx, length); 
        left(turtleState, 90);             // Rotate left by 90 degrees
    }
};

const forward = (turtleState, ctx, length) => {
    const angleInRadians = (turtleState.angle * Math.PI) / 180;

    const newX = turtleState.x + length * Math.sin(angleInRadians);
    const newY = turtleState.y - length * Math.cos(angleInRadians);

    if (ctx && turtleState.penDown) {
        ctx.beginPath();
        ctx.moveTo(turtleState.x, turtleState.y);
        ctx.lineTo(newX, newY);
        ctx.strokeStyle = turtleState.penColor;
        ctx.lineWidth = turtleState.lineWidth;
        ctx.stroke();
    }

    // 更新 Turtle 的位置
    turtleState.x = newX;
    turtleState.y = newY;
};

const left = (turtleState, angle) => {
    turtleState.angle = (turtleState.angle + angle) % 360;
};
