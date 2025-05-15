export class KuroLS {
  static updateItem<V>(key: string, value?: V): void {
    if (typeof value === "undefined") {
      console.warn(
        "If you're trying to remove a key, use `removeItemFromKey` or `removeItemFromIndex`; otherwise, pass `null` instead, ya dingus",
      )
      return
    }

    try {
      localStorage.setItem(key, JSON.stringify(value))

      window.dispatchEvent(
        new CustomEvent("kuro:storage", {
          detail: { key, value },
        }),
      )
    } catch (err) {
      console.error("Something fuked up:", err)
    }
  }

  static getItem<V>(key: string): V | null {
    const raw = localStorage.getItem(key)
    if (raw === null) return null

    try {
      return JSON.parse(raw)
    } catch (err) {
      console.warn("Couldn't parse stored value, returning raw string")
      return raw as unknown as V
    }
  }

  static removeItem(key: string) {
    localStorage.removeItem(key)
  }

  static unsafe_nuke() {
    localStorage.clear()
  }
}

type CouldBeEmpty<T> = T | never[] | null

/** Used for dealing with structured data from localStorage */
export class KuroObjectLS<
  V extends Record<string, unknown> | Record<string, unknown>[],
> {
  public storageValue: CouldBeEmpty<V> = null

  constructor(
    public key: string,
    defaultValue: CouldBeEmpty<V> = null,
  ) {
    if (!(window && localStorage)) {
      throw new Error("Bruh moment")
    }

    const lsItem = localStorage.getItem(key)
    if (lsItem !== null) {
      try {
        this.storageValue = JSON.parse(lsItem)
      } catch {
        console.warn("Stored value got nothing fam")
        this.storageValue = defaultValue
      }
    }
  }

  appendItem(valueToAppend: V): void {
    const current = KuroLS.getItem(this.key)

    if (Array.isArray(current)) {
      current.push(valueToAppend)

      KuroLS.updateItem(this.key, current)
    } else if (current === null) {
      KuroLS.updateItem(this.key, [valueToAppend])
    } else {
      KuroLS.updateItem(this.key, [valueToAppend])
    }
  }

  prependItem(valueToPrepend: V): void {
    const current = KuroLS.getItem(this.key)

    if (Array.isArray(current)) {
      current.unshift(valueToPrepend)

      KuroLS.updateItem(this.key, current)
    } else if (current === null) {
      KuroLS.updateItem(this.key, [valueToPrepend])
    } else {
      KuroLS.updateItem(this.key, [valueToPrepend])
    }
  }
}
