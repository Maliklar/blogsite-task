export default function validateEmail(s?: string | null) {
  if (!s) return false;
  if (!s?.trim()) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
