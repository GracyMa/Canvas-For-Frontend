

export const hexagon = (turtle, ctx, length = 50) => {
    for (let i = 1; i <= 6; i++) {  // Draw each side of the hexagon
        turtle.forward(length, ctx); // Use the turtle to draw forward
        turtle.left(60); // Rotate the turtle left by 60 degrees
    }
};

export const star = (turtle, ctx) => {
    for (let i = 0; i < 18; i++) {  // Draw each segment of the star
        turtle.forward(80, ctx); 
        turtle.left(100); // Rotate the turtle left by 100 degrees
    }
};

// Add a new shape square
export const square = (turtle, ctx, length = 50) => {
    for (let i = 0; i < 4; i++) {  // Draw each side of square 
        turtle.forward(length, ctx); 
        turtle.left(90);             // Rotate left by 90 degrees
    }
};