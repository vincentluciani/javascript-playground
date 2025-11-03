/* Shared configuration defining level thresholds and circle colors */
const LEVELS_CONFIG = [
  { xp: 0,     fd: 0,   colors: ["white", "white", "white", "yellow"], label: "White - Yellow" },
  { xp: 400,   fd: 1,   colors: ["white", "white", "yellow", "yellow"], label: "Yellow" },
  { xp: 900,   fd: 3,   colors: ["white", "yellow", "yellow", "yellow"], label: "Deep Yellow" },
  { xp: 1500,  fd: 6,   colors: ["yellow", "yellow", "yellow", "yellow"], label: "Full Yellow" },

  { xp: 2100,  fd: 10,  colors: ["yellow", "yellow", "yellow", "orange"], label: "Yellow-Orange" },
  { xp: 2800,  fd: 15,  colors: ["yellow", "yellow", "orange", "orange"], label: "Orange" },
  { xp: 3400,  fd: 20,  colors: ["yellow", "orange", "orange", "orange"], label: "Deep Orange" },
  { xp: 4000,  fd: 26,  colors: ["orange", "orange", "orange", "orange"], label: "Full Orange" },

  { xp: 4600,  fd: 33,  colors: ["orange", "orange", "orange", "green"], label: "Orange-Green" },
  { xp: 5200,  fd: 41,  colors: ["orange", "orange", "green", "green"], label: "Green" },
  { xp: 6100,  fd: 50,  colors: ["orange", "green", "green", "green"], label: "Deep Green" },
  { xp: 7000,  fd: 60,  colors: ["green", "green", "green", "green"], label: "Full Green" },

  { xp: 8000,  fd: 71,  colors: ["green", "green", "green", "blue"], label: "Green-Blue" },
  { xp: 9000,  fd: 83,  colors: ["green", "green", "blue", "blue"], label: "Blue" },
  { xp: 10200, fd: 96,  colors: ["green", "blue", "blue", "blue"], label: "Deep Blue" },
  { xp: 11500, fd: 110, colors: ["blue", "blue", "blue", "blue"], label: "Full Blue" },

  { xp: 12800, fd: 125, colors: ["blue", "blue", "blue", "brown"], label: "Blue-Brown" },
  { xp: 14500, fd: 140, colors: ["blue", "blue", "brown", "brown"], label: "Brown" },
  { xp: 16200, fd: 156, colors: ["blue", "brown", "brown", "brown"], label: "Deep Brown" },
  { xp: 18000, fd: 173, colors: ["brown", "brown", "brown", "brown"], label: "Full Brown" },

  { xp: 20000, fd: 191, colors: ["brown", "brown", "brown", "black"], label: "Brown-Black" },
  { xp: 22000, fd: 210, colors: ["brown", "brown", "black", "black"], label: "Black" },
  { xp: 24000, fd: 230, colors: ["brown", "black", "black", "black"], label: "Deep Black" },
  { xp: 26000, fd: 250, colors: ["black", "black", "black", "black"], label: "Full Black" },
];

const FULL_DAY_BONUS_XP = 20; /* Bonus XP per full day (all goals achieved) */

/**
 * Returns the circle colors based on XP, full-day count (FD),
 * and whether the user missed a full day this month.
 */
function getCircleColors(xp, fd, missedFullDayThisMonth = false) {
  /* Find the last level where XP and FD meet or exceed the thresholds */
  const currentLevel =
    [...LEVELS_CONFIG].reverse().find(l => xp >= l.xp && fd >= l.fd) ||
    LEVELS_CONFIG[0];

  /* Copy the colors so we can modify safely */
  const colors = [...currentLevel.colors];

  /* Downgrade last circle if user missed a full day this month */
  if (missedFullDayThisMonth && colors[3] === "black") {
    colors[3] = "brown";
  }

  return colors;
}

/**
 * Returns progress info toward the next level.
 */

function getNextLevelProgress(currentXP, currentFD, goalsPerDay) {
  const xpPerGoal = 10;  /* XP gained per goal */
  
  const xpPerDay = goalsPerDay * xpPerGoal;

  /* Find the current and next level in LEVELS_CONFIG */
  let currentLevelIndex = 0;
  for (let i = LEVELS_CONFIG.length - 1; i >= 0; i--) {
    if (currentXP >= LEVELS_CONFIG[i].xp && currentFD >= LEVELS_CONFIG[i].fd) {
      currentLevelIndex = i;
      break;
    }
  }

  const currentLevel = LEVELS_CONFIG[currentLevelIndex];
  const nextLevel = LEVELS_CONFIG[currentLevelIndex + 1];

  if (!nextLevel) {
    return `🥋 You have achieved the highest rank: ${currentLevel.label}!`;
  }

  /* Calculate how much XP and FD are left */
  const remainingXP = Math.max(0, nextLevel.xp - currentXP);
  const remainingFD = Math.max(0, nextLevel.fd - currentFD);

  /* Estimate days to reach next level (XP and FD may differ) */
  const effectiveXpPerDay = xpPerDay + FULL_DAY_BONUS_XP;

  const daysForXP = effectiveXpPerDay > 0 ? Math.ceil(remainingXP / effectiveXpPerDay) : Infinity;
  const daysForFD = Math.ceil(remainingFD);

  /* must satisfy both XP & FD requirements */
  const daysToNextLevel = Math.max(daysForXP, daysForFD);

  /* Format the colors display for context */
  const colorCircles = nextLevel.colors.join(" • ");

  return `
🏅 Current Level: ${currentLevel.label}
➡️ Next Level: ${nextLevel.label}
🎨 Next Belt Colors: ${colorCircles}

📈 XP: ${currentXP} / ${nextLevel.xp} (need ${remainingXP} XP)
🔥 FD: ${currentFD} / ${nextLevel.fd} (need ${remainingFD} FD)

📅 If you complete all ${goalsPerDay} goals every day:
   → You earn ${xpPerDay} XP and 1 FD per day
   → You’ll reach ${nextLevel.label} in about ${daysToNextLevel} day${daysToNextLevel > 1 ? "s" : ""}
`;
}



/**
 * Utility: Adds XP for a given day depending on goals achieved.
 * fullGoalsReached = true → adds full day bonus.
 */
function calculateDailyXP(goalsCompleted, totalGoals, baseXP = 10) {
  let xp = goalsCompleted * baseXP;
  if (goalsCompleted === totalGoals) xp += FULL_DAY_BONUS_XP;
  return xp;
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
      el.style.display = "inline-block"; /* or "block" depending on your layout*/
      /* Add new color class */
      el.classList.add(`${colors[index]}belt`);
    }
  });
}
