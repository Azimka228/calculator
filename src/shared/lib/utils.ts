export function isObjectEqual(obj1: Record<string, any>, obj2: Record<string, any>): boolean {
  if (obj1 === null || obj1 === undefined || obj2 === null || obj2 === undefined) {
    return false
  }

  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)

  if (obj1Keys.length !== obj2Keys.length) {
    return false
  }

  return obj1Keys.every(prop => {
    if (!(prop in obj2)) {
      return false
    }

    if (typeof obj1[prop] !== typeof obj2[prop]) {
      return false
    }

    if (typeof obj1[prop] === "object") {
      return isObjectEqual(obj1[prop] as Record<string, unknown>, obj2[prop] as Record<string, unknown>)
    }

    return obj1[prop] === obj2[prop]
  })
}
