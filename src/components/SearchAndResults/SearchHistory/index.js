import { Body, PreviousSearches, PreviousSearchesText } from './styles'
import { GifContext } from '@/providers'

const SearchHistory = () => {
  const { searchHistory, gifFetcher } = GifContext.useContainer()

  const historyClickHandler = ({ currentTarget }) => {
    console.log('Click', currentTarget.innerText)
    gifFetcher(currentTarget.innerText)
  }

  return (
    <Body>
      <PreviousSearchesText>
        <span>Previous</span>
        <span>Searches:</span>
      </PreviousSearchesText>
      <PreviousSearches>
        {searchHistory.map((prevSearch, index) => (
          <div>
            <span onClick={historyClickHandler}>{prevSearch}</span>
            {index !== searchHistory.length - 1 && <span>{', '}</span>}
          </div>
        ))}
      </PreviousSearches>
    </Body>
  )
}

export default SearchHistory
