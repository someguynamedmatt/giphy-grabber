import { useEffect, useRef, useState } from 'react'
import { createContainer } from 'unstated-next'
import { usePersistence } from '../hooks'
import { normalizeGiphyResponse } from '@/utils'

const HISTORY_KEY = '@gif::history'

const useGifs = (initialState = []) => {
  const { setInLocalStorage, getFromLocalStorage } = usePersistence()
  const [gifs, setGifs] = useState(initialState)
  const [searchTerm, setSearchTerm] = useState('trending')
  const searchHistory = useRef([])

  useEffect(() => {
    searchHistory.current = Array.from(new Set([...(getFromLocalStorage(HISTORY_KEY) ?? [])]))
  }, [])

  useEffect(() => {
    let previousHistory = getFromLocalStorage(HISTORY_KEY) ?? []
    setInLocalStorage(HISTORY_KEY, Array.from(new Set([...previousHistory, searchTerm])))
  }, [searchHistory.current.length])

  const setGifsForContext = gifs => {
    setGifs(gifs)
  }

  // TODO break this apart into more explicit fns; e.g. fetchTrendingGifs, fetchWithQuery, etc.
  const fetchGifs = async query => {
    const res = await fetch(query && query !== 'trending' ? `/api/gifs?q=${query}` : `/api/gifs`)
    const data = await res.json()
    if (query) {
      setSearchTerm(query)
      setHistory(query)
    }
    setGifs(data)
    return data
  }

  // TODO CLEAN THIS UP
  const setHistory = query => {
    if (!query) return
    let previousHistory = getFromLocalStorage(HISTORY_KEY) ?? []
    searchHistory.current = Array.from(new Set([...previousHistory, query]))
    setSearchTerm(searchTerm)
  }

  return {
    currentSearchTerm: searchTerm,
    gifFetch: fetchGifs,
    gifs: gifs,
    searchHistory: searchHistory.current,
    setGifs: setGifsForContext,
    setSearchHistory: setHistory,
    setSearchTerm,
  }
}

export const GifContext = createContainer(useGifs)
