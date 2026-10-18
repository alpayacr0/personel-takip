export function logAction(action, details = {}) {
  const time = new Date().toLocaleTimeString("tr-TR");
  console.log(`[${time}] ${action}`, details);
}
