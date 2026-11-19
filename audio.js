const SOUND_FILES = {
  toggle: new URL('./assets/audios/speaker-toggle.mp3', import.meta.url),
  start: new URL('./assets/audios/start-sound.ogg', import.meta.url),
  reStart: new URL('./assets/audios/re-start.wav', import.meta.url),
  X: new URL('./assets/audios/X-sound.wav', import.meta.url),
  O: new URL('./assets/audios/O-sound.wav', import.meta.url),
  draw: new URL('./assets/audios/draw-sound.wav', import.meta.url),
  success: new URL('./assets/audios/success-sound-effect.mp3', import.meta.url),
};

const audioCache = new Map();
const soundBtn = document.querySelector('#sound-btn');

function getAudio(name) {
  let audio = audioCache.get(name);
  if (!audio) {
    audio = new Audio();
    audio.preload = 'auto';
    audio.src = SOUND_FILES[name].href;
    audio.load();
    audioCache.set(name, audio);
  }

  return audio;
}

function preloadSounds() {
  for (const name of Object.keys(SOUND_FILES)) {
    try {
      getAudio(name);
    } catch (error) {
      console.warn(`Audio effect "${name}" could not be preloaded.`, error);
    }
  }
}

function stopAllSounds() {
  for (const [name, audio] of audioCache) {
    try {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    } catch (error) {
      console.warn(`Audio effect "${name}" could not be stopped.`, error);
    }
  }
}

function playSound(name, playWhileMuted = false) {
  try {
    if (soundBtn.classList.contains('is-muted') && !playWhileMuted) return;

    const audio = getAudio(name);
    audio.currentTime = 0;
    const playback = audio.play();
    if (playback && typeof playback.catch === 'function') {
      playback.catch((error) => {
        if (error?.name === 'AbortError') return;
        console.warn(`Audio effect "${name}" could not be played.`, error);
      });
    }
  } catch (error) {
    console.warn(`Audio effect "${name}" could not be played.`, error);
  }
}

export function playMoveSound(marker) {
  playSound(marker);
}

export function playStartSound() {
  playSound('start');
}

export function playReStartSound() {
  playSound('reStart');
}

export function playGameEndSound(result) {
  playSound(result);
}

soundBtn.addEventListener('click', () => {
  const isMuted = soundBtn.classList.toggle('is-muted');

  soundBtn.setAttribute('aria-label', isMuted ? 'Unmute sound' : 'Mute sound');
  soundBtn.setAttribute('aria-pressed', String(isMuted));

  if (isMuted) stopAllSounds();
  playSound('toggle', true);
});

preloadSounds();
