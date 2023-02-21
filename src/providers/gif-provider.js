import { useEffect, useState } from 'react'
import { createContainer } from 'unstated-next'
import { usePersistence } from '../hooks'

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
  }, [])

  const fetchGifs = async ({ query, pageReset } = { query: null, pageReset: false }) => {
    const pageNumber = pageReset ? 1 : page + 1
    const res = await fetch(
      query ? `/api/gifs?q=${query}&page=${pageNumber}` : `/api/gifs?page=${pageNumber}`
    )
    const data = await res.json()
    setGifs(prev => {
      if (pageReset) return [...data]
      return [...prev, ...data]
    })
    setSearchTerm(query)
    setPage(pageNumber)
  }

  const setHistory = query => {
    if (!query) return
    let previousHistory = getFromLocalStorage(HISTORY_KEY) ?? []
    setSearchHistory(
      Array.from(
        new Set([query, ...(Array.isArray(previousHistory) ? previousHistory : [previousHistory])])
      )
    )
    setInLocalStorage(HISTORY_KEY, query)
    setSearchTerm(searchTerm)
  }

  return {
    fetchGifs,
    gifs,
    page,
    searchHistory,
    searchTerm,
    setHistory,
    setSearchTerm,
  }
}

export const GifContext = createContainer(useGifs)
