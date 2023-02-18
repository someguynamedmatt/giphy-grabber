import { SearchHistory, PreviousSearches, PreviousSearchesText } from './styles'
import { GifContext } from '@/providers'

const SearchHistoryComponent = () => {
  const { searchHistory, gifFetcher } = GifContext.useContainer()

  const historyClickHandler = ({ currentTarget }) => {
    gifFetcher(currentTarget.innerText)
  }

  // TODO BUG: there's a bug where immediately-viewed histories disappear from the list
  return (
    <SearchHistory>
      <PreviousSearchesText>
        <span>Previous</span>
        <span>Searches:</span>
      </PreviousSearchesText>
      <PreviousSearches>
        {searchHistory
          .filter(i => i)
          .map((prevSearch, index) => (
            <div key={`${index}-${prevSearch}`}>
              <span onClick={historyClickHandler}>{prevSearch}</span>
              {index !== searchHistory.length - 1 && <span>{', '}</span>}
            </div>
          ))}
      </PreviousSearches>
    </SearchHistory>
  )
}

export default SearchHistoryComponent
