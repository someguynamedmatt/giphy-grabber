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
  const [searchHistory, setSearchHistory] = useState([])

  useEffect(() => {
    const fromLS = getFromLocalStorage(HISTORY_KEY)
    setSearchHistory(Array.from(new Set([...(Array.isArray(fromLS) ? fromLS : [fromLS])])))
  }, [searchHistory.length])

  const determineNextState =
    (reset = false, newData) =>
    (state = []) => {
      if (reset) return []
      return state?.concat(newData)
    }

  const fetchGifs = async ({ query, pageReset } = { query: null, pageReset: false }) => {
    // If the query does not equal the search term, we assume this is a new search
    // which should see new pages (starting from 1).
    /* setPage(searchTerm !== query && 1) */
    const pageNumber = pageReset ? 1 : page + 1
    const res = await fetch(
      query ? `/api/gifs?q=${query}&page=${pageNumber}` : `/api/gifs?page=${pageNumber}`
    )
    const data = await res.json()
    setGifs(determineNextState(pageReset, data))
    setSearchTerm(query)
    setPage(pageNumber)

    debugger
    return data
  }

  // TODO CLEAN THIS UP
  const setHistory = query => {
    if (!query) return
    let previousHistory = getFromLocalStorage(HISTORY_KEY) ?? []
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
    searchHistory: searchHistory,
    searchTerm,
    setSearchTerm,
    setHistory,
  }
}

export const GifContext = createContainer(useGifs)
