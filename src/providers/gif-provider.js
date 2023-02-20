import { useEffect, useRef, useState } from 'react'
import { createContainer } from 'unstated-next'
import { usePersistence } from '../hooks'
import { normalizeGiphyResponse } from '@/utils'

const HISTORY_KEY = '@gif::history'

const useGifs = (initialState = []) => {
  const { setInLocalStorage, getFromLocalStorage } = usePersistence()
  const [gifs, setGifs] = useState(initialState)
  const [searchTerm, setSearchTerm] = useState()
  const [page, setPage] = useState(1)
  const searchHistory = useRef([])

  useEffect(() => {
    const fromLS = getFromLocalStorage(HISTORY_KEY)
    searchHistory.current = Array.from(new Set([...(Array.isArray(fromLS) ? fromLS : [fromLS])]))
    /* searchHistory.current = Array.from(
     *   new Set([query, ...(Array.isArray(previousHistory) ? previousHistory : [previousHistory])])
     * ) */
  }, [])

  /* useEffect(() => {
   *   let previousHistory = getFromLocalStorage(HISTORY_KEY) ?? []
   *   setInLocalStorage(HISTORY_KEY, Array.from(new Set([...previousHistory, searchTerm])))
   * }, [searchHistory.current.length])
   */
  const fetchGifs = async ({ query } = { query: null }) => {
    const res = await fetch(query ? `/api/gifs?q=${query}&page=${page}` : `/api/gifs?page=${page}`)
    const data = await res.json()
    setGifs(data)
    setSearchTerm(query)
    setPage(page + 1)
    return data
  }

  // TODO CLEAN THIS UP
  const setHistory = query => {
    if (!query) return
    let previousHistory = getFromLocalStorage(HISTORY_KEY) ?? []
    console.log('prev', previousHistory)
    searchHistory.current = Array.from(
      new Set([query, ...(Array.isArray(previousHistory) ? previousHistory : [previousHistory])])
    )
    setInLocalStorage(HISTORY_KEY, query)
    setSearchTerm(searchTerm)
  }

  return {
    fetchGifs,
    gifs,
    page,
    searchHistory: searchHistory.current,
    searchTerm,
    setGifs,
    setSearchTerm,
    setHistory,
  }
}

export const GifContext = createContainer(useGifs)
