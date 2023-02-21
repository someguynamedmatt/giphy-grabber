export const usePersistence = () => {
  const isWindowDefined = Boolean(globalThis?.window)
  const isLocalStorageDefined = Boolean(isWindowDefined && window.localStorage)
  const isSessionStorageDefined = Boolean(isWindowDefined && window.sessionStorage)

  const setInLocalStorage = (key, val) => {
    if (!isLocalStorageDefined) return
    const current = getFromLocalStorage(key)
    current.push(val)
    const jsonArray = JSON.stringify(current)
    try {
      window.localStorage.setItem(key, jsonArray)
    } catch (err) {
      console.error(`[ERROR]: could not set val: ${val} with key: ${key} in localStorage`, err)
    }
  }

  const getFromLocalStorage = key => {
    if (!isLocalStorageDefined) {
      console.warn(`[WARN]: localStorage is undefined`)
      return null
    }
    let val = null
    try {
      val = JSON.parse(window.localStorage.getItem(key)) ?? []
    } catch (err) {
      console.error(`[ERROR]: could not parse value from localStorage with key ${key}`)
    }
    return val
  }

  return {
    setInLocalStorage,
    getFromLocalStorage,
  }
}
