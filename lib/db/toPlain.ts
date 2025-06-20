export default function toPlain(obj: any, seen = new WeakSet()): any {
  if (!obj) return obj;
  if (Array.isArray(obj)) return obj.map((item) => toPlain(item, seen));
  if (typeof obj === "object") {
    if (seen.has(obj)) return undefined;
    seen.add(obj);
    const plain: any = {};
    for (const key in obj) {
      if (key === "_id" || key === "owner" || key === "list" || key === "board") {
        plain[key] = obj[key]?.toString?.() ?? obj[key];
      } else if (Array.isArray(obj[key])) {
        plain[key] = obj[key].map((item: any) => toPlain(item, seen));
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        plain[key] = toPlain(obj[key], seen);
      } else {
        plain[key] = obj[key];
      }
    }
    return plain;
  }
  return obj;
} 