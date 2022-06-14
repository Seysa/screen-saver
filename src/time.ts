export function toHour(date: Date | number, seconds?: boolean): string {
  // if unix type of date is passed, convert to date object
  if (typeof date === "number") {
    return toHour(new Date(date), seconds);
  }
  // else if date object is passed, convert to string
  // hh:mm:ss
  if (seconds) return date.toLocaleTimeString("fr");
  // hh:mm
  return date.toLocaleTimeString("fr", { hour: "2-digit", minute: "2-digit" });
}
