export const hexagon = (shape, ctx) => {
    const { x, y, length, angle, color, lineWidth } = shape;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth; 
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const rad = (angle + i * 60) * (Math.PI / 180);
        const nextX = x + length * Math.cos(rad);
        const nextY = y + length * Math.sin(rad);
        ctx.lineTo(nextX, nextY);
    }
    ctx.closePath();
    ctx.stroke();
};

export const star = (shape, ctx) => {
    const { x, y, length, color, lineWidth } = shape;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth; 
    ctx.beginPath();
    for (let i = 0; i < 18; i++) {
        const rad = (i * 100 * Math.PI) / 180;
        const nextX = x + length * Math.cos(rad);
        const nextY = y + length * Math.sin(rad);
        ctx.lineTo(nextX, nextY);
    }
    ctx.closePath();
    ctx.stroke();
};

export const square = (shape, ctx) => {
    const { x, y, length, color, lineWidth } = shape;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth; 
    ctx.beginPath();
    ctx.rect(x, y, length, length);
    ctx.stroke();
};
