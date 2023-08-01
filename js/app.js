const changeLocation = document.getElementById("change-location");
const card = document.getElementById("card");
const details = document.getElementById("details");
const weatherIcon = document.getElementById("weather-icon");
const overlay = document.getElementById("overlay");

changeLocation.city.focus();
// updata ui

// loader

function loader(state) {
  if (state) {
    overlay.classList.remove("d-none");
  } else {
    overlay.classList.add("d-none");
  }
}
const updataUI = (weather) => {
  details.innerHTML = `
        <h5 class="mb-3">${weather.name}, ${weather.sys.country}</h5>
        <p class="mb-3">${weather.weather[0].main}</p>
        <div class="display-4 mb-3">
        <span>${Math.round(weather.main.temp)}</span>
        <span>&deg;C</span>
        </div>
    `;

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }

  weatherIcon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
};
// get weather
const getWeather = async (city) => {
  const data = await getData(city);
  return data;
};

// get Location
changeLocation.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityName = changeLocation.city.value.trim();
  changeLocation.reset();
  getWeather(cityName).then((data) => updataUI(data));
});

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas size to the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create an array to hold the particles
const particles = [];
const numParticles = 100;

// Function to create a random number between min and max (inclusive)
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = random(2, 8);
        this.color = `hsl(${random(0, 360)}, 100%, 50%)`;
        this.vx = random(-1, 1);
        this.vy = random(-1, 1);
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off the edges of the canvas
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.vx = -this.vx;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.vy = -this.vy;
        }
    }
}

// Create particles and add them to the array
for (let i = 0; i < numParticles; i++) {
    const x = random(0, canvas.width);
    const y = random(0, canvas.height);
    const particle = new Particle(x, y);
    particles.push(particle);
}

function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw each particle
    for (const particle of particles) {
        particle.update();
        particle.draw();
    }

    // Request the next animation frame
    requestAnimationFrame(animate);
}

// Start the animation loop
animate();

// Resize the canvas if the window is resized
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});