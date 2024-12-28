
export const drawRectangle = (ctx, { x, y, width, height, color }) => {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = "transparent"; 
    ctx.strokeStyle = color || "#000000"; 
    ctx.stroke();
};

export const drawCircle = (ctx, { x, y, radius, color }) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "transparent"; 
    ctx.strokeStyle = color || "#000000"; 
    ctx.stroke();
};

