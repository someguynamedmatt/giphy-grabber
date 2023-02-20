import { useEffect } from 'react'

export const usePersistence = () => {
  const isWindowDefined = Boolean(globalThis.window)
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

  const setInSessionStorage = (key, val) => {
    if (!isSessionStorageDefined) return
    try {
      window.sessionStorage.setItem(key, JSON.stringify(val))
    } catch (err) {
      console.error(`[ERROR]: could not set val: ${val} with key: ${key} in sessionStorage`, err)
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

  const getFromSessionStorage = key => {
    if (!isSessionStorageDefined) {
      console.warn(`[WARN]: sessionStorage is undefined`)
      return null
    }
    let val = null
    try {
      val = JSON.parse(window.sessionStorage.getItem(key))
    } catch (err) {
      console.error(`[ERROR]: could not parse value from sessionStorage with key ${key}`)
    }
    return val
  }

  return {
    setInLocalStorage,
    setInSessionStorage,
    getFromLocalStorage,
    getFromSessionStorage,
  }
}
