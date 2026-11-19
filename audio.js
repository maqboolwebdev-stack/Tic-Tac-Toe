const SOUND_FILES = {
  start: new URL('./audioes/start-sound.ogg', import.meta.url),
  reStart: new URL('./audioes/re-start.wav', import.meta.url),
  X: new URL('./audioes/X-sound.wav', import.meta.url),
  O: new URL('./audioes/O-sound.wav', import.meta.url),
  draw: new URL('./audioes/draw-sound.wav', import.meta.url),
  success: new URL('./audioes/success-sound-effect.mp3', import.meta.url),
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
