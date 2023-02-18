import { Body } from './styles'
import { GifContext } from '@/providers'

export const ResultsCallout = () => {
  const { currentSearchTerm } = GifContext.useContainer()
  return (
    <Body>
      Showing results for:&nbsp;<b>{currentSearchTerm || 'trending'}</b>
    </Body>
  )
}

export default ResultsCallout
