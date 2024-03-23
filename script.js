const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
// console.log(ctx, "canvas 2d context");
const particlesArr = [];
let hue = 0;
let increment = 3;

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

// function drawCircle(color = "#dcdcdc") {
//   ctx.beginPath();
//   ctx.fillStyle = color;
//   ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
//   ctx.fill();
// }

// UPDATE MOUSE COORDINATES
// canvas.addEventListener("mousemove", (e) => {
//   mouse.x = e.clientX;
//   mouse.y = e.clientY;
// });

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;

    this.size = Math.random() * 20 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5; // random num between +1.5 and -1.5
    this.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    this.hueColor = `hsl(${hue},100%,75%)`;
  }

  update() {
    // make sure dots are inside the boundary
    if (this.x >= canvas.width - this.size && this.speedX > 0) {
      this.x -= this.speedX;
    } else if (this.x < 0 && this.speedX < 0) {
      this.x -= this.speedX;
    } else {
      // Move the ball in its current direction
      this.x += this.speedX;
    }

    if (this.y >= canvas.height - this.size && this.speedY > 0) {
      this.y -= this.speedY;
    } else if (this.y < 0 && this.speedY < 0) {
      this.y -= this.speedY;
    } else {
      // Move the ball in its current direction
      this.y += this.speedY;
    }

    // shrink the particle
    if (this.size > 5) this.size -= 0.05;
  }

  draw() {
    ctx.beginPath();
    // ctx.fillStyle = this.color; // random color
    ctx.fillStyle = "#fff"; //

    // ctx.fillStyle = this.hueColor; // inner loop to create satellite
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// INITIALIZE with 50 particles
// function init() {
//   for (let i = 0; i < 50; i++) {
//     particlesArr.push(new Particle());
//   }
// }
// init();

// Create new particles on Click
// canvas.addEventListener("click", (e) => {
//   mouse.x = e.clientX;
//   mouse.y = e.clientY;
//   for (let i = 0; i < 10; i++) {
//     particlesArr.push(new Particle());
//   }
// });

// Create new particles on mouse move
canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  for (let i = 0; i < 2; i++) {
    particlesArr.push(new Particle());
  }
});

// HANDLE PARTICLE - update coordinates and draw on the canvas
function handleParticle() {
  for (let i = 0; i < particlesArr.length; i++) {
    const particle = particlesArr[i];
    particle.update();
    particle.draw();

    // inner for loop
    for (let j = i; j < particlesArr.length; j++) {
      const particle2 = particlesArr[j];
      const dx = particle.x - particle2.x;
      const dy = particle.y - particle2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 80) {
        ctx.beginPath();
        //ctx.strokeStyle = particle.hueColor;
        ctx.strokeStyle = "#fff";
        //ctx.lineWidth = particle.size * 10;
        ctx.lineWidth = 2;
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle2.x, particle2.y);
        //ctx.stroke();
      }
    }

    // remove particle if it's too small
    if (particle.size <= 5) {
      particlesArr.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // instead of clear rect we fill the canvas with a semitransparent background so that we can see a bit trailing
  // ctx.fillStyle = "rgba(0,0,0,0.1)";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  // call the function
  handleParticle();
  // so that hue is between 0 - 360
  hue = (hue + increment) % 360;
  requestAnimationFrame(animate);
}

animate();
