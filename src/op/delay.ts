export function delay<T>(result: T, milisseconds: number = 0): Promise<T> {
  return new Promise(resolve => setTimeout(resolve, milisseconds, result))
}

export function sleep<T>(milisseconds: number): Promise<T> {
  return new Promise(resolve => setTimeout(resolve, milisseconds))
}
