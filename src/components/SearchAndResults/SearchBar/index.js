/* THEIRS */
import { useState, useRef, useEffect } from 'react'
import { useDebounce } from 'react-use'
import Image from 'next/image'
/* OURS */
import { GifContext } from '@/providers'
import { Search, Input } from './styles'

export const testId = 'searchbar-instance'

const DEBOUNCE_MS = process.env.DEBOUNCE_MS || 500

const SearchBar = () => {
  const [inputValue, setInputValue] = useState(undefined)
  const [debouncedValue, setDebouncedValue] = useState('')
  const [data, setData] = useState(null)
  const { fetchGifs, fetchWithQuery, setGifs, setHistory } = GifContext.useContainer()

  // useDebounce(() => setDebouncedValue(inputValue), DEBOUNCE_MS, [inputValue])

  const onChange = ({ target: { value } }) => {
    setInputValue(value)
  }

  const searchClickHandler = () => {
    setHistory(inputValue)
    fetchGifs({ query: inputValue })
  }

  const onKeydown = event => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault()
      console.log('FETCHING WITH QUERY', inputValue)
      setHistory(inputValue)
      fetchGifs({ query: inputValue })
    }
  }

  useEffect(() => {
    fetchGifs()
  }, [])

  return (
    <Search data-testid={testId}>
      <Input value={inputValue} placeholder='Search...' onChange={onChange} onKeyDown={onKeydown} />
      <Image
        onClick={searchClickHandler}
        src={'/giphy_grabber_search_icon.webp'}
        alt='search icon'
        height={52}
        width={52}
      />
    </Search>
  )
}

export default SearchBar
