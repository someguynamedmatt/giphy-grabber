import { useEffect, useRef, useState } from 'react'
import { createContainer } from 'unstated-next'
import { usePersistence } from '../hooks'
import { normalizeGiphyResponse } from '@/utils'

const HISTORY_KEY = '@gif::history'

const useGifs = (initialState = []) => {
  const { setInLocalStorage, getFromLocalStorage } = usePersistence()
  const [gifs, setGifs] = useState(initialState)
  const [searchTerm, setSearchTerm] = useState()
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
  const setGifsForContext = gifs => {
    console.log('GIFSforContext', gifs.length)
    setGifs(gifs)
  }

  const fetchGifs = async url => {
    const res = await fetch(url)
    const data = await res.json()
    setGifs(data)
    return data
  }

  const fetchWithQuery = async ({ query, page } = { page: 0 }) => {
    if (!page) setGifs([])
    setSearchTerm(query)
    return await fetchGifs(`/api/gifs?q=${query}&page=${page}`)
  }

  const fetchTrending = async ({ page } = { page: 0 }) => {
    return await fetchGifs(`/api/gifs?page=${page}`)
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
    fetchTrending,
    fetchWithQuery,
    gifs,
    searchHistory: searchHistory.current,
    searchTerm,
    setGifs: setGifsForContext,
    setSearchTerm,
    setHistory,
  }
}

export const GifContext = createContainer(useGifs)
