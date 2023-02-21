import { useState } from 'react'
import Image from 'next/image'
import { GifContext } from '@/providers'
import { Search, Input } from './styles'

export const testId = 'searchbar-instance'

const SearchBar = () => {
  const [inputValue, setInputValue] = useState(undefined)
  const { fetchGifs, setHistory } = GifContext.useContainer()

  const onChange = ({ target: { value } }) => {
    setInputValue(value)
  }

  const searchClickHandler = () => {
    setHistory(inputValue)
    fetchGifs({ query: inputValue, pageReset: true })
  }

  const onKeydown = event => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault()
      setHistory(inputValue)
      fetchGifs({ query: inputValue, pageReset: true })
    }
  }

  return (
    <Search data-testid={testId}>
      <Input placeholder='Search...' onChange={onChange} onKeyDown={onKeydown} />
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
