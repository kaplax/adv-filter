export function createId() {
  return `${new Date().getTime()}${Math.random()}`
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
