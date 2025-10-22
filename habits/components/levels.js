function getCircleColors(xp, fd, missedFullDayThisMonth = false) {
  /* Base XP thresholds */
  if (xp < 300) return ["white", "white", "white", "yellow"];
  if (xp < 600) return ["white", "white", "yellow", "yellow"];
  if (xp < 900) return ["white", "yellow", "yellow", "yellow"];
  if (xp < 1600) return ["yellow", "yellow", "yellow", "yellow"];
  if (xp < 2400) return ["yellow", "yellow", "orange", "orange"];
  if (xp < 3600) return ["orange", "orange", "orange", "orange"];
  if (xp < 4400) return ["orange", "orange", "green", "green"];
  if (xp < 5400) return ["green", "green", "green", "green"];

  /* Higher levels require both XP and FD */
  if (xp >= 5400 && xp < 6000) return ["green", "green", "blue", "blue"];
  if (xp >= 6000 && fd < 1000) return ["green", "green", "blue", "blue"]; // waiting for FD
  if (xp >= 6000 && fd >= 1000 && xp < 7700) return ["blue", "blue", "blue", "blue"];
  
  if (xp >= 7700 && fd < 2000) return ["blue", "blue", "blue", "brown"]; // waiting for FD
  if (xp >= 7700 && fd >= 2000 && xp < 10400) return ["brown", "brown", "brown", "brown"];
  
  if (xp >= 10400 && fd < 2700) return ["brown", "brown", "brown", "black"]; // waiting for FD
  let finalColor = ["black", "black", "black", "black"];

  /* Check circle 4 downgrade if missed full day this month */
  if (missedFullDayThisMonth) finalColor[3] = "brown";

  return finalColor;
}

/**
 * Apply circle colors to the DOM.
 * This function removes old belt color classes and adds the new ones.
 */
function applyCircleColors(colors) {
  const allColors = ["white", "yellow", "orange", "green", "blue", "brown", "black"];
  const circles = ["circle1", "circle2", "circle3", "circle4"];

  const circle1Color = colors[0];

  circles.forEach((id, index) => {
    const el = document.getElementById(id);
    if (!el) return;

    /* Remove any previous belt class */
    allColors.forEach(color => el.classList.remove(`${color}belt`));

    /* If circle2, 3, or 4 is the same as circle1, hide it */
   /* if (index > 0 && colors[index] === circle1Color) {
      el.style.display = "none";
    } else {*/
    if (index >= 0){
      el.style.display = "inline-block"; // or "block" depending on your layout
      /* Add new color class */
      el.classList.add(`${colors[index]}belt`);
    }
  });
}

/*
function getNextLevelProgress(xp, fd) {
  const thresholds = [
    { xp: 0, fd: 0, label: "White - Yellow" },
    { xp: 300, fd: 0, label: "Yellow" },
    { xp: 900, fd: 0, label: "Orange" },
    { xp: 2400, fd: 0, label: "Green" },
    { xp: 5400, fd: 1000, label: "Blue" },
    { xp: 7700, fd: 2000, label: "Brown" },
    { xp: 10400, fd: 2700, label: "Black" },
  ];

  const current = thresholds.findLast(t => xp >= t.xp && fd >= (t.fd || 0)) || thresholds[0];
  const currentIndex = thresholds.indexOf(current);
  const next = thresholds[currentIndex + 1];

  if (!next) {
    return {
      message: "You have reached the top! Keep your streak to maintain your black circles.",
      remainingXp: 0,
      remainingFd: 0,
      nextLabel: "Max level"
    };
  }

  const remainingXp = Math.max(next.xp - xp, 0);
  const remainingFd = Math.max((next.fd || 0) - fd, 0);

  const xpPart = remainingXp > 0 ? `${remainingXp} XP` : "";
  const fdPart = remainingFd > 0 ? `${remainingFd} FD` : "";
  const separator = xpPart && fdPart ? " and " : "";

  return {
    currentLabel: current.label,
    nextLabel: next.label,
    remainingXp,
    remainingFd,
    message: `Next level (${next.label}) in ${xpPart}${separator}${fdPart}.`
  };
}*/
