import { useRef, useEffect, useCallback, useState } from 'react'
import { findDOMNode } from 'react-dom'
import { Grid } from './styles'
import { Gif } from '@/components'
import { GifContext } from '@/providers'

const GifGrid = ({ gifs: trendingGifs }) => {
  const {
    gifs: { gifs: searchedGifs },
  } = GifContext.useContainer()
  const [displayableGifs, setDisplayableGifs] = useState(
    searchedGifs?.length ? searchedGifs : trendingGifs
  )

  useEffect(() => {
    if (searchedGifs?.length) {
      setDisplayableGifs(searchedGifs)
    }
  }, [searchedGifs])

  return (
    <Grid data-testid='grid-instance'>
      {displayableGifs.map(gif => (
        <Gif key={gif.id} gif={gif} />
      ))}
    </Grid>
  )
}

export default GifGrid
