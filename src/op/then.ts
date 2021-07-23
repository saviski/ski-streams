export async function then<T, TResult1 = T, TResult2 = never>(
  source: AsyncIterable<T>,
  onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
  onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
): Promise<TResult1 | TResult2> {
  try {
    let result
    for await (let v of source) result = v
    return onfulfilled?.(result)!
  } catch (e) {
    return onrejected?.(e)!
  }
}
