// Animated Clock Icon
class AnimatedClock {
  constructor(iconElement) {
    this.icon = iconElement;
    this.canvas = null;
    this.ctx = null;
    this.init();
  }

  init() {
    // Create canvas for clock
    this.canvas = document.createElement("canvas");
    this.canvas.width = 48;
    this.canvas.height = 48;
    this.canvas.style.width = "24px";
    this.canvas.style.height = "24px";
    this.canvas.style.display = "block";

    this.ctx = this.canvas.getContext("2d");

    // Replace icon with canvas
    if (this.icon) {
      this.icon.innerHTML = "";
      this.icon.appendChild(this.canvas);
      this.icon.style.display = "inline-flex";
      this.icon.style.alignItems = "center";
      this.icon.style.justifyContent = "center";
    }

    // Start animation
    this.animate();
  }

  animate() {
    const draw = () => {
      const now = new Date();
      const hours = now.getHours() % 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const milliseconds = now.getMilliseconds();

      // Clear canvas
      this.ctx.clearRect(0, 0, 48, 48);

      // Clock circle
      this.ctx.strokeStyle = "#86efac"; // Light green
      this.ctx.fillStyle = "rgba(134, 239, 172, 0.1)";
      this.ctx.lineWidth = 2.5;
      this.ctx.beginPath();
      this.ctx.arc(24, 24, 19, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();

      // Center dot
      this.ctx.fillStyle = "#86efac";
      this.ctx.beginPath();
      this.ctx.arc(24, 24, 2, 0, Math.PI * 2);
      this.ctx.fill();

      // Hour hand
      const hourAngle = (hours + minutes / 60) * (Math.PI / 6) - Math.PI / 2;
      this.drawHand(hourAngle, 10, 3, "#86efac");

      // Minute hand
      const minuteAngle =
        (minutes + seconds / 60) * (Math.PI / 30) - Math.PI / 2;
      this.drawHand(minuteAngle, 14, 2.5, "#86efac");

      // Second hand (with milliseconds for smooth animation)
      const secondAngle =
        (seconds + milliseconds / 1000) * (Math.PI / 30) - Math.PI / 2;
      this.drawHand(secondAngle, 16, 1.5, "#22c55e"); // Brighter green

      requestAnimationFrame(draw);
    };

    draw();
  }

  drawHand(angle, length, width, color) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.lineCap = "round";
    this.ctx.beginPath();
    this.ctx.moveTo(24, 24);
    this.ctx.lineTo(
      24 + Math.cos(angle) * length,
      24 + Math.sin(angle) * length
    );
    this.ctx.stroke();
  }
}

// Initialize animated clock when modal opens
let animatedClockInstance = null;

function initAnimatedClock() {
  const clockIcon = document.getElementById("clock-icon-wrapper");
  if (clockIcon && !animatedClockInstance) {
    animatedClockInstance = new AnimatedClock(clockIcon);
  }
}

// Cleanup when modal closes
function destroyAnimatedClock() {
  if (animatedClockInstance) {
    animatedClockInstance = null;
  }
}
