const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
// console.log(ctx, "canvas 2d context");

// SETTING CANVAS
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// RESIZE EVENT LISTENER
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// global variable
const mouse = {
  x: undefined,
  y: undefined,
};

// Draw a Circle on Click
// canvas.addEventListener("click", (e) => {
//   mouse.x = e.clientX;
//   mouse.y = e.clientY;
//   drawCircle();
// });

// Brush Stroke Effect on MouseMove
// canvas.addEventListener("mousemove", (e) => {
//   mouse.x = e.clientX;
//   mouse.y = e.clientY;
//   drawCircle();
// });

// UPDATE MOUSE COORDINATES
canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function drawCircle(color = "#dcdcdc") {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
  ctx.fill();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // if comment out this line, we can see the brush stroke effect
  drawCircle("#4c0ffb");
  requestAnimationFrame(animate);
}

animate();
