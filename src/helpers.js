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
  const minutes = pad(Math.floor(timer / 60));
  const seconds = pad(timer % 60);
  return `${minutes}:${seconds}`;
}
