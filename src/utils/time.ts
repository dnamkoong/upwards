export const msToTime = (ms: number | undefined) => {
  const hours = Math.floor(ms / 3600000); // 1000 * 60 * 60
  const minutes = Math.floor((ms % 3600000) / 60000); // 1000 * 60
  const seconds = Math.floor((ms % 60000) / 1000);

  let timeString = '';

  if (hours > 0) {
    timeString += `${hours}:`;
  }

  if (hours > 0 || minutes > 0) {
    timeString += `${hours > 0 ? String(minutes).padStart(2, '0') : minutes}:`;
  }

  timeString += `${hours > 0 || minutes > 0 ? String(seconds).padStart(2, '0') : seconds}`;

  return timeString;
}
