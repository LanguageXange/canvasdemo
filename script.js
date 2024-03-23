const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
// console.log(ctx, "canvas 2d context");
const particlesArr = [];

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
canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor() {
    // this.x = mouse.x;
    // this.y = mouse.y;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 20 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5; // random num between +1.5 and -1.5
    this.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  update() {
    // make sure dots are inside the boundary
    if (this.x >= canvas.width - this.size && this.speedX > 0) {
      this.x -= this.speedX;
    } else if (this.x <0 && this.speedX < 0) {
      this.x -= this.speedX;
    } else {
      // Move the ball in its current direction
      this.x += this.speedX;
    }

    if (this.y >= canvas.height - this.size && this.speedY > 0) {
      this.y -= this.speedY ;
    } else if (this.y < 0 && this.speedY < 0) {
      this.y -= this.speedY;
    } else {
      // Move the ball in its current direction
      this.y += this.speedY;
    }


    // shrink
    if(this.size > 5) this.size -= 0.1

    

  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < 50; i++) {
    particlesArr.push(new Particle());
  }
}
init();

function handleParticle() {
  for (let i = 0; i < particlesArr.length; i++) {
    const particle = particlesArr[i]
    particle.update();
    particle.draw();
    if(particle.size <= 5) {
      particlesArr.splice(i,1)
      i--;

    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // if comment out this line, we can see the brush stroke effect
  handleParticle();
  requestAnimationFrame(animate);
}

animate();
