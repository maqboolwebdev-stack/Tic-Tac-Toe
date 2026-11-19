const SOUND_FILES = {
  start: new URL('../assets/audioes/start-sound.ogg', import.meta.url),
  reStart: new URL('../assets/audioes/re-start.wav', import.meta.url),
  X: new URL('../assets/audioes/X-sound.wav', import.meta.url),
  O: new URL('../assets/audioes/O-sound.wav', import.meta.url),
  draw: new URL('../assets/audioes/draw-sound.wav', import.meta.url),
  success: new URL('../assets/audioes/success-sound-effect.mp3', import.meta.url),
};

const audioCache = new Map();

function playSound(name) {
  try {
    let audio = audioCache.get(name);
    if (!audio) {
      audio = new Audio(SOUND_FILES[name]);
      audioCache.set(name, audio);
    }

    audio.currentTime = 0;
    const playback = audio.play();
    if (playback && typeof playback.catch === 'function') {
      playback.catch((error) => {
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
