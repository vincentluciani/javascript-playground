/* Shared configuration defining level thresholds and circle colors */
const LEVELS_CONFIG = [
  { xp: 0,     fd: 0,   colors: ["white", "white", "white", "purple"], label: "White - purple" },
  { xp: 400,   fd: 1,   colors: ["white", "white", "purple", "purple"], label: "purple" },
  { xp: 900,   fd: 3,   colors: ["white", "purple", "purple", "purple"], label: "Deep purple" },
  { xp: 1500,  fd: 6,   colors: ["purple", "purple", "purple", "purple"], label: "Full purple" },

  { xp: 2100,  fd: 10,  colors: ["purple", "purple", "purple", "orange"], label: "purple-Orange" },
  { xp: 2800,  fd: 15,  colors: ["purple", "purple", "orange", "orange"], label: "Orange" },
  { xp: 3400,  fd: 20,  colors: ["purple", "orange", "orange", "orange"], label: "Deep Orange" },
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

const FULL_DAY_BONUS_XP = 35; /* Bonus XP per full day (all goals achieved) */
const XP_PER_GOAL = 10;  /* XP gained per goal */

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

  const xpPerDay = goalsPerDay * XP_PER_GOAL;

  if (goalsPerDay == 0) {
    return `
      <div style="
        padding: 20px;
        line-height: 1.6;
      ">
        <h2 style="color:#d9534f;">⚠️ No Daily Goals Completed</h2>
        <p>You are currently not completing any goals per day.</p>
        <p>Start completing goals to earn XP and FD!</p>
      </div>
    `;
  }

  /* Find current and next level */
  let currentLevelIndex = 0;
  for (let i = LEVELS_CONFIG.length - 1; i >= 0; i--) {
    if (currentXP >= LEVELS_CONFIG[i].xp && currentFD >= LEVELS_CONFIG[i].fd) {
      currentLevelIndex = i;
      break;
    }
  }

  const currentLevel = LEVELS_CONFIG[currentLevelIndex];
  const nextLevel = LEVELS_CONFIG[currentLevelIndex + 1];

  const okButton = '<div class="add-button large" onclick="closeLevelInfoMessage();">OK</div>';
  if (!nextLevel) {
    return `
      <div style="
        padding: 20px;
        line-height: 1.6;
      ">
        <h2>🥋 Highest Rank Achieved</h2>
        <p>You have achieved the highest rank: <strong>${currentLevel.label}</strong>!</p>
        ${okButton}
      </div>
      ${okButton}
    `;
  }

  const remainingXP = Math.max(0, nextLevel.xp - currentXP);
  const remainingFD = Math.max(0, nextLevel.fd - currentFD);

  const effectiveXpPerDay = xpPerDay + FULL_DAY_BONUS_XP;
  const daysForXP = effectiveXpPerDay > 0 ? Math.ceil(remainingXP / effectiveXpPerDay) : Infinity;
  const daysForFD = Math.ceil(remainingFD);
  const daysToNextLevel = Math.max(daysForXP, daysForFD);

  const currentColorCircles = currentLevel.colors.join(" • ");
  const nextColorCircles = nextLevel.colors.join(" • ");

  return `
    <div style="
      padding: 24px;
      line-height: 1.7;
      max-width: 900px;
      margin: auto;
    ">
      <h2 style="margin-bottom: 12px;color: black;">Progress Toward Next Level</h2>

      <section style="margin-bottom: 20px;">
        <h3>🎽 Belt Status</h3>
        <ul>
          <li><strong>Current belt:</strong> ${currentColorCircles}</li>
          <li><strong>Next belt:</strong> ${nextColorCircles}</li>
        </ul>
      </section>

      <section style="margin-bottom: 20px;">
        <h3>📈 XP Progress</h3>
        <p>You currently have <strong>${currentXP} XP</strong>.</p>
        <ul>
          <li>Next level requires: <strong>${nextLevel.xp} XP</strong></li>
          <li>Remaining: <strong>${remainingXP} XP</strong></li>
        </ul>
      </section>

      <section style="margin-bottom: 20px;">
        <h3>🔥 Full Days (FD)</h3>
        <p>You have achieved <strong>${currentFD} FD</strong>.</p>
        <ul>
          <li>Next level requires: <strong>${nextLevel.fd} FD</strong></li>
          <li>Remaining: <strong>${remainingFD} FD</strong></li>
        </ul>
      </section>

      <section style="margin-bottom: 20px;">
        <h3>📅 Daily Impact</h3>
        <ul>
          <li>You complete an average of <strong>${goalsPerDay}</strong> goals/day.</li>
          <li>You can earn <strong>${xpPerDay} XP</strong> (10 per achieved goal) + ${FULL_DAY_BONUS_XP} bonus per full day = ${effectiveXpPerDay} XP per day</li>
          <li>You can earn <strong>1 FD per day</strong>.</li>
        </ul>
      </section>

      <section>
        <h3>⏳ Estimated Time to Reach Next Belt</h3>
        <p>
          At your current pace, if you reach all your goals, you will reach the belt 
          <strong>${nextColorCircles}</strong> in approximately 
          <strong>${daysToNextLevel} day${daysToNextLevel > 1 ? "s" : ""}</strong>.
        </p>
      </section>
      ${okButton}
    </div>
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
  const allColors = ["white", "purple", "orange", "green", "blue", "brown", "black"];
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

var showNextLevel = function(){

    var XP=0;
    var FD=0;
    goalsPerDay=0
    if (null!=dataArrays && null!=dataArrays.counts&& null!= dataArrays.counts.daysWithAllTargetsMet){
        FD=dataArrays.counts.daysWithAllTargetsMet;
    }

    if (null!=dataArrays && null!=dataArrays.counts&& null!= dataArrays.counts.xpCounting){
      XP=dataArrays.counts.xpCounting;
    } 

    if (null!=dataArrays && null!=dataArrays.habitsArray){
      goalsPerDay=dataArrays.habitsArray.length;
    } 

    document.getElementById("level-information-message").style.display="flex";
    document.getElementById("information-message").innerHTML = getNextLevelProgress(XP, FD, goalsPerDay);
}

var closeLevelInfoMessage = function(){
    document.getElementById("level-information-message").style.display="none";
}

