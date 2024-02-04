export function getNextMonth(): Date {
  const now = new Date();
  if (now.getMonth() === 11) {
    return new Date(now.getFullYear() + 1, 0, 1);
  } else {
    return new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }
}
