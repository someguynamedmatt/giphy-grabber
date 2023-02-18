import { useRef, useEffect, useCallback, useState } from 'react'
import { findDOMNode } from 'react-dom'
import { Grid } from './styles'
import { Gif } from '@/components'
import { GifContext } from '@/providers'
import { useIntersection } from 'react-use'

const GifGrid = () => {
  const { gifs, fetchWithQuery, currentSearchTerm, setGifs } = GifContext.useContainer()
  const pageRef = useRef(1)
  const ref = useRef(null)
  const intersection = useIntersection(ref, { root: null, rootMargin: '0px', threshold: 0.5 })

  useEffect(() => {
    const fn = async () => {
      if (intersection?.intersectionRatio) {
        console.log('INTERSECTION')
        pageRef.current += 1
        const newBatch = await fetchWithQuery({ query: currentSearchTerm, page: pageRef.current })
        console.log('INTERSECTION', newBatch)
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
