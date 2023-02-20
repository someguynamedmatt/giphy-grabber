import { Results } from './styles'
import { GifContext } from '@/providers'

export const testId = 'resultsCallout-instance'

export const ResultsCallout = () => {
  const { searchTerm } = GifContext.useContainer()
  return (
    <Results data-testid={testId}>
      Showing results for:&nbsp;<b>{searchTerm || 'trending'}</b>
    </Results>
  )
}

export default ResultsCallout
