import { ClassicalNoise } from "./classical-noise";
export function bgAnimation(theme, config) {
  const { speedRef, isPlayingRef } = config;

  const strokeColor = theme === "dark" ? "rgba(255,255,255," : "rgba(0,0,0,";
  const canvas = document.getElementById("canvas");
  if (!canvas) return () => {};
  const ctx = canvas.getContext("2d");
  const perlin = new ClassicalNoise();
  const variation = 0.0025;
  const amp = 50;
  const variators = [];
  const max_lines = navigator.userAgent.toLowerCase().includes("firefox")
    ? 25
    : 40;

  let canvasWidth, canvasHeight, start_y;
  let animationId;

  for (let i = 0, u = 0; i < max_lines; i++, u += 0.02) {
    variators[i] = u;
  }

  function draw() {
    ctx.shadowColor = "rgba(43, 205, 255, 1)";
    ctx.shadowBlur = 0;

    for (let i = 0; i <= max_lines; i++) {
      ctx.beginPath();
      ctx.moveTo(0, start_y);
      for (let x = 0; x <= canvasWidth; x++) {
        var y = perlin.noise(x * variation + variators[i], x * variation, 0);
        ctx.lineTo(x, start_y + amp * y);
      }

      const alpha = Math.min(Math.abs(y) + 0.05, 0.05);

      if (isPlayingRef.current) {
        const hue = (variators[i] * 50) % 720;
        ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${alpha * 5})`;
      } else {
        ctx.strokeStyle = strokeColor + alpha * 5 + ")";
      }

      ctx.stroke();
      ctx.closePath();

      variators[i] += 0.005 * speedRef.current;
    }
  }

  function resizeCanvas() {
    canvasWidth = document.documentElement.clientWidth;
    canvasHeight = 200;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    start_y = canvasHeight / 2;
  }

  function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    draw();
    animationId = requestAnimationFrame(animate);
  }

  resizeCanvas();
  animate();
  window.addEventListener("resize", resizeCanvas);

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", resizeCanvas);
  };
}
