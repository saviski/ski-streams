export async function* filter<T, S extends T>(
  source: AsyncIterable<T>,
  test: (value: T, index: number) => boolean = Boolean,
  index = 0
): AsyncIterable<S> {
  for await (const value of source) if (test(value, index++)) yield <S>value
}

export async function* filterValue<T, S extends T>(source: AsyncIterable<T>, filterValue: S): AsyncIterable<S> {
  for await (const value of source) if (value == filterValue) yield <S>value
}
