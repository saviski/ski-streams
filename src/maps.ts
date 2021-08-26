export class WeakMapOfMaps<T extends object, K, U> {
  private map = new WeakMap<T, Map<K, U>>()

  private getMap(index: T) {
    return (this.map.has(index) || this.map.set(index, new Map())) && this.map.get(index)!
  }

  get<V extends U>(object: T, index: K, init: () => V, miss = false): V {
    if (miss) return init()
    const propertyMap = this.getMap(object)
    return (propertyMap.has(index) || propertyMap.set(index, init())) && (propertyMap.get(index) as V)
  }
}

export class SetMap<T extends object, U> {
  private map = new WeakMap<T, Set<U>>()

  private getSet(index: T) {
    return (this.map.has(index) || this.map.set(index, new Set())) && this.map.get(index)!
  }

  add(index: T, value: U): this {
    this.getSet(index).add(value)
    return this
  }

  clear(index: T) {
    this.getSet(index).clear()
  }

  delete(index: T, value: U): boolean {
    return this.getSet(index).delete(value)
  }

  has(index: T, value: U): boolean {
    return this.getSet(index).has(value)
  }
}
