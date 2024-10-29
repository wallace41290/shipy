export function getNextMonth(): Date {
  const now = new Date();
  const day = now.getDate();
  if (now.getMonth() === 11) {
    return new Date(now.getFullYear() + 1, 0, day);
  } else {
    return new Date(now.getFullYear(), now.getMonth() + 1, day);
  }
}
