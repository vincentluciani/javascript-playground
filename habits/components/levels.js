function getCircleColors(xp, fd) {
  /* Circle colors evolve gradually to keep user motivated */
  if (xp < 300) return ["white", "white", "white", "yellow"];
  if (xp < 600) return ["white", "white", "yellow", "yellow"];
  if (xp < 900) return ["white", "yellow", "yellow", "yellow"];
  if (xp < 1200) return ["yellow", "yellow", "yellow", "yellow"];
  if (xp < 1600) return ["yellow", "yellow", "yellow", "orange"];
  if (xp < 2000) return ["yellow", "yellow", "orange", "orange"];
  if (xp < 2400) return ["yellow", "orange", "orange", "orange"];
  if (xp < 2800) return ["orange", "orange", "orange", "orange"];
  if (xp < 3200) return ["orange", "orange", "orange", "green"];
  if (xp < 3600) return ["orange", "orange", "green", "green"];
  if (xp < 4000) return ["orange", "green", "green", "green"];
  if (xp < 4400) return ["green", "green", "green", "green"];
  if (xp < 4900) return ["green", "green", "green", "blue"];
  if (xp < 5400) return ["green", "green", "blue", "blue"];
  if (xp < 5900) return ["green", "blue", "blue", "blue"];
  if (xp < 6500) return ["blue", "blue", "blue", "blue"];
  if (xp < 7100) return ["blue", "blue", "blue", "brown"];
  if (xp < 7700) return ["blue", "blue", "brown", "brown"];
  if (xp < 8300) return ["blue", "brown", "brown", "brown"];
  if (xp < 8900) return ["brown", "brown", "brown", "brown"];
  if (xp < 9500) return ["brown", "brown", "brown", "black"];
  if (xp < 10100) return ["brown", "brown", "black", "black"];
  if (xp < 10700) return ["brown", "black", "black", "black"];
  return ["black", "black", "black", "black"];
}

/**
 * Apply circle colors to the DOM.
 * This function removes old belt color classes and adds the new ones.
 */
function applyCircleColors(colors) {
  const allColors = ["white", "yellow", "orange", "green", "blue", "brown", "black"];
  const circles = ["circle1", "circle2", "circle3", "circle4"];

  circles.forEach((id, index) => {
    const el = document.getElementById(id);
    if (!el) return;
    /* Remove any previous belt class */
    allColors.forEach(color => el.classList.remove(`${color}belt`));
    /* Add new color */
    el.classList.add(`${colors[index]}belt`);
  });
}
