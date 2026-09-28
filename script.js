"use strict";

const CARD_CONFIG = {
  daughterName: "Ульяна",
  birthdayMessage: "С Днём Рождения, {name}!",
  finalMessage: "Мы тебя очень сильно любим! Весёлого тебе дня рождения. Ты очень большая умница, и мы гордимся тем, как ты стараешься и занимаешься.",
  colors: { pink: "#f16c9d", purple: "#7453a1", gold: "#ffce64" },
  sounds: {
    enabledByDefault: false,
    backgroundNotes: [392, 440, 523, 440, 349, 392, 440, 523],
    waveform: "sine"
  }
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let currentScene = "INTRO";
let transitionPending = false;
let muted = !CARD_CONFIG.sounds.enabledByDefault;
let audioContext;
let musicTimer;
let noteIndex = 0;
let foundAnimals = new Set();
let busy = false;
const girl = document.getElementById("girl");
const meadowStage = document.getElementById("meadow-stage");
const scenePositions = {
  RED: [73, 38], BLUE: [84, 48], GRASS: [58, 36],
  DOG: [37, 63], FROG: [70, 72]
};

function pause(ms) {
  return new Promise(resolve => window.setTimeout(resolve, reducedMotion.matches ? Math.min(ms, 60) : ms));
}

function personalized(text) {
  return text.replaceAll("{name}", CARD_CONFIG.daughterName);
}

function showScene(next) {
  const previous = document.querySelector(".scene.active");
  const incoming = document.getElementById(next.toLowerCase());
  if (!incoming || previous === incoming) return;
  currentScene = next;
  previous.classList.remove("active");
  previous.classList.add("leaving");
  window.setTimeout(() => {
    previous.classList.remove("leaving");
    incoming.classList.add("active");
  }, reducedMotion.matches ? 0 : 250);
}

function openPresent() {
  if (transitionPending || currentScene !== "INTRO") return;
  transitionPending = true;
  startMusic();
  document.querySelector(".intro-stage").classList.add("opened");
  document.getElementById("start").disabled = true;
  document.getElementById("present").disabled = true;
  window.setTimeout(() => {
    showScene("MEADOW");
    transitionPending = false;
  }, reducedMotion.matches ? 50 : 1150);
}

function audio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  audioContext ||= new AudioContextClass();
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

function playNote(frequency, duration = .3, type = CARD_CONFIG.sounds.waveform, volume = .035) {
  if (muted) return;
  const context = audio();
  if (!context) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(.001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(volume, context.currentTime + .035);
  gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration + .02);
}

function startMusic() {
  if (muted || musicTimer || currentScene === "FINAL") return;
  audio();
  const playNext = () => {
    if (!muted) playNote(CARD_CONFIG.sounds.backgroundNotes[noteIndex++ % CARD_CONFIG.sounds.backgroundNotes.length], .5);
  };
  playNext();
  musicTimer = window.setInterval(playNext, 850);
}

function stopMusic() {
  window.clearInterval(musicTimer);
  musicTimer = undefined;
}

function rustleLeaves() {
  if (muted) return;
  const context = audio();
  if (!context) return;
  const buffer = context.createBuffer(1, Math.floor(context.sampleRate * .45), context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  source.buffer = buffer;
  filter.type = "lowpass";
  filter.frequency.value = 1600;
  gain.gain.value = .07;
  source.connect(filter).connect(gain).connect(context.destination);
  source.start();
}

function moveGirl(x, y) {
  girl.classList.add("walking");
  girl.style.setProperty("--girl-x", `${x}%`);
  girl.style.setProperty("--girl-y", `${y}%`);
}

async function visitPlace(place) {
  if (busy || currentScene !== "MEADOW") return;
  if (place === "HOUSE") {
    if (foundAnimals.size < 2) return;
    showScene("CAKE");
    return;
  }
  busy = true;
  meadowStage.querySelector(".hotspots").classList.add("busy");
  const prompt = document.getElementById("meadow-prompt");
  const descriptions = {
    RED: "Что прячется у красных ягод?",
    BLUE: "Кто живёт в синем кустике?",
    GRASS: "Поищем на лугу...",
    DOG: "Кто там у конуры?",
    FROG: "Посмотрим у пруда!"
  };
  prompt.textContent = descriptions[place];
  const [x, y] = scenePositions[place];
  moveGirl(x, y);
  await pause(1050);
  girl.classList.remove("walking");

  if (place === "GRASS") {
    for (const spot of [[61, 33], [65, 39]]) {
      girl.classList.add("looking");
      await pause(1150);
      girl.classList.remove("looking");
      girl.classList.add("shrugging");
      await pause(550);
      girl.classList.remove("shrugging");
      if (spot[0] === 61) {
        moveGirl(...spot);
        await pause(1000);
        girl.classList.remove("walking");
      }
    }
  } else {
    if (place === "RED" || place === "BLUE") {
      meadowStage.classList.add("rustling");
      rustleLeaves();
      await pause(450);
      meadowStage.classList.remove("rustling");
    }
    const animalId = { RED: "bear", BLUE: "birds", DOG: "dog", FROG: "frog" }[place];
    const animal = document.getElementById(animalId);
    animal.classList.add("revealed");
    girl.classList.add("jumping");
    playNote(place === "RED" ? 440 : 659, .35);
    await pause(place === "BLUE" ? 1700 : 950);
    girl.classList.remove("jumping");
    foundAnimals.add(place);
    updateAnimalCount();
    moveGirl(46, 48);
    await pause(1000);
    girl.classList.remove("walking");
    animal.classList.remove("revealed");
  }
  if (place === "GRASS") {
    moveGirl(46, 48);
    await pause(1000);
    girl.classList.remove("walking");
  }
  prompt.textContent = "Найди зверюшек!";
  meadowStage.querySelector(".hotspots").classList.remove("busy");
  busy = false;
}

function updateAnimalCount() {
  const count = foundAnimals.size;
  document.getElementById("meadow-status").textContent = count < 2
    ? `Найдено зверюшек: ${count} из 2 для входа в домик.`
    : `Найдено зверюшек: ${count}! Теперь можно зайти в домик.`;
  const house = document.getElementById("house-hotspot");
  house.disabled = count < 2;
  if (!house.disabled) house.setAttribute("aria-label", "Зайти в домик и увидеть торт");
}

function createConfetti() {
  const container = document.getElementById("confetti");
  container.replaceChildren();
  const colors = [CARD_CONFIG.colors.pink, CARD_CONFIG.colors.purple, CARD_CONFIG.colors.gold, "#82cfc7"];
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 55; i++) {
    const piece = document.createElement("i");
    piece.style.setProperty("--confetti-color", colors[i % colors.length]);
    piece.style.setProperty("--confetti-x", `${Math.random() * 100}%`);
    piece.style.setProperty("--fall-duration", `${2 + Math.random() * 1.2}s`);
    piece.style.setProperty("--fall-delay", `${Math.random() * .6}s`);
    fragment.appendChild(piece);
  }
  container.appendChild(fragment);
}

function startCelebration() {
  stopMusic();
  document.getElementById("cake-stage").classList.add("celebrating");
  document.getElementById("cake-instruction").textContent = "Ура! С праздником!";
  createConfetti();
  [523, 659, 784, 1047].forEach((note, i) => window.setTimeout(() => playNote(note, .45, "sine", .09), i * 160));
  window.setTimeout(() => {
    showScene("FINAL");
    document.getElementById("confetti").replaceChildren();
  }, reducedMotion.matches ? 1100 : 3600);
}

function extinguishCandle(event) {
  const candle = event.currentTarget;
  if (currentScene !== "CAKE" || candle.disabled) return;
  candle.disabled = true;
  candle.classList.add("out");
  playNote(784, .18);
  if ([...document.querySelectorAll(".candle")].every(item => item.disabled)) startCelebration();
}

function restartCard() {
  stopMusic();
  foundAnimals = new Set();
  busy = false;
  transitionPending = false;
  noteIndex = 0;
  girl.className = "girl";
  girl.style.removeProperty("--girl-x");
  girl.style.removeProperty("--girl-y");
  document.querySelectorAll(".animal").forEach(animal => animal.classList.remove("revealed"));
  document.querySelector(".hotspots").classList.remove("busy");
  document.querySelector(".intro-stage").classList.remove("opened");
  document.getElementById("present").disabled = false;
  document.getElementById("start").disabled = false;
  document.getElementById("cake-stage").classList.remove("celebrating");
  document.querySelectorAll(".candle").forEach(candle => {
    candle.disabled = false;
    candle.classList.remove("out");
  });
  document.getElementById("cake-instruction").textContent = "Нажми на каждую свечку и задуй её!";
  updateAnimalCount();
  showScene("INTRO");
}

function updateSoundButton() {
  const button = document.getElementById("sound-toggle");
  button.setAttribute("aria-pressed", String(!muted));
  button.setAttribute("aria-label", muted ? "Включить звук" : "Выключить звук");
  button.textContent = muted ? "♪ Звук: выкл." : "♪ Звук: вкл.";
}

document.getElementById("present").addEventListener("click", openPresent);
document.getElementById("start").addEventListener("click", openPresent);
document.getElementById("sound-toggle").addEventListener("click", () => {
  muted = !muted;
  if (muted) stopMusic();
  else startMusic();
  updateSoundButton();
});
document.querySelectorAll(".hotspot").forEach(button => button.addEventListener("click", () => visitPlace(button.dataset.place)));
document.querySelectorAll(".candle").forEach(button => button.addEventListener("click", extinguishCandle));
document.getElementById("restart").addEventListener("click", restartCard);
document.getElementById("birthday-heading").textContent = personalized(CARD_CONFIG.birthdayMessage);
document.getElementById("final-heading").textContent = personalized(CARD_CONFIG.birthdayMessage);
document.getElementById("final-message").textContent = personalized(CARD_CONFIG.finalMessage);
document.documentElement.style.setProperty("--pink", CARD_CONFIG.colors.pink);
document.documentElement.style.setProperty("--purple", CARD_CONFIG.colors.purple);
document.documentElement.style.setProperty("--gold", CARD_CONFIG.colors.gold);
updateSoundButton();
