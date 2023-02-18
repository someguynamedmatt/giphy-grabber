import { Results } from './styles'
import { GifContext } from '@/providers'

export const testId = 'resultsCallout-instance'

export const ResultsCallout = () => {
  const { currentSearchTerm } = GifContext.useContainer()
  return (
    <Results data-testid={testId}>
      Showing results for:&nbsp;<b>{currentSearchTerm || 'trending'}</b>
    </Results>
  )
}

export default ResultsCallout
