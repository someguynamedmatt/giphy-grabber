import { SearchHistory, PreviousSearches, PreviousSearchesText } from './styles'
import { GifContext } from '@/providers'

const SearchHistoryComponent = () => {
  const { searchHistory, fetchGifs } = GifContext.useContainer()

  const historyClickHandler = ({ currentTarget }) => {
    fetchGifs({ query: currentTarget.innerText })
  }

  return (
    <SearchHistory>
      <PreviousSearchesText>
        <span>Previous</span>
        <span>Searches:</span>
      </PreviousSearchesText>
      <PreviousSearches>
        {searchHistory
          .map((prevSearch, index) => (
            <div key={`${index}-${prevSearch}`}>
              <span onClick={historyClickHandler}>{prevSearch}</span>
              {index !== searchHistory?.length - 1 && <span>{', '}</span>}
            </div>
          ))}
      </PreviousSearches>
    </SearchHistory>
  )
}

export default SearchHistoryComponent
