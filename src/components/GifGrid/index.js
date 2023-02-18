import { useRef, useEffect, useCallback, useState } from 'react'
import { findDOMNode } from 'react-dom'
import { Grid } from './styles'
import { Gif } from '@/components'
import { GifContext } from '@/providers'
import { useIntersection } from 'react-use'

const GifGrid = () => {
  const { gifs, gifFetch, currentSearchTerm, setGifs } = GifContext.useContainer()

  const ref = useRef(null)
  const intersection = useIntersection(ref, { root: null, rootMargin: '0px', threshold: 1 })

  useEffect(() => {
    const fn = async () => {
      if (intersection?.intersectionRatio) {
        const newBatch = await gifFetch(currentSearchTerm)
        if (newBatch?.length) {
          setGifs([...gifs, ...newBatch])
        }
      }
    }
    fn()
  }, [intersection?.intersectionRatio])

  return (
    <Grid data-testid='grid-instance'>
      {gifs?.map(gif => (
        <Gif key={gif.id} gif={gif} />
      ))}
      <div ref={ref} />
    </Grid>
  )
}

export default GifGrid
