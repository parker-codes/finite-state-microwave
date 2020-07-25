export function pad(value) {
  return value.toString().padStart(2, '0');
}

export function formatDigits(digits) {
  const padded = digits.padStart(4, '0');
  const firstPart = padded.slice(0, 2);
  const secondPart = padded.slice(2, 4);
  return `${firstPart}:${secondPart}`;
}

export function formatTimer(timer) {
  let minutes, seconds;
  if (timer < 6000) { // <= 99:59
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;
  } else { // limit minutes to two digits
    minutes = 99;
    seconds = timer - minutes * 60;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}
