document.addEventListener('mousemove', (e) => {
  const overlay = document.querySelector('.overlay');
  const x = e.clientX;
  const y = e.clientY;

  overlay.style.background = `radial-gradient(
    circle 200px at ${x}px ${y}px, 
    transparent 0%, 
    rgba(0, 0, 0, 0.95) 180px
  )`;
});
