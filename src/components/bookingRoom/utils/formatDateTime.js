export function formatDateTime(input) {
  if (input === undefined) return;
  const date = input instanceof Date ? input : new Date(input);
  if (isNaN(date)) {
    throw new Error("Invalid date: " + input);
  }

  const pad = (n) => String(n).padStart(2, "0");

  const Y = date.getFullYear();
  const M = pad(date.getMonth() + 1);
  const D = pad(date.getDate());
  const h = pad(date.getHours());
  const m = pad(date.getMinutes());
  const s = pad(date.getSeconds());

  return `${Y}-${M}-${D} ${h}:${m}:${s}`;
}
