import { useRef, useEffect, useCallback, useState } from 'react'
import { findDOMNode } from 'react-dom'
import { Grid, GridWrapper } from './styles'
import { Gif } from '@/components'
import { GifContext } from '@/providers'
import { useIntersection } from 'react-use'
import { useDebounce } from 'react-use'

const GifGrid = () => {
  const { gifs, fetchWithQuery, currentSearchTerm, setGifs } = GifContext.useContainer()
  const pageRef = useRef(1)
  const ref = useRef(null)
  const intersection = useIntersection(ref, { root: null, rootMargin: '0px', threshold: 0.5 })
  const { window, document } = globalThis

  const resizeMasonryItem = ({ item, rowGap, rowHeight }) => {
    const rowSpan = Math.ceil(
      (item.querySelector('.grid-item').getBoundingClientRect().height + rowGap) /
        (rowHeight + rowGap)
    )
    item.style.gridRowEnd = `span ${rowSpan}`
  }

  const resizeAllMasonryItems = useCallback(() => {
    const grid = document?.getElementsByClassName('grid')[0]
    const allItems = document?.getElementsByClassName('grid-item-wrapper')
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('row-gap'))
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'))

    for (let i = 0; i < allItems.length; i++) {
      resizeMasonryItem({ item: allItems[i], rowGap, rowHeight })
    }
  }, [document, window])

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

  /* useDebounce(fn, 150, [fn]) */

  useEffect(() => {
    if (window) {
      window.addEventListener('resize', resizeAllMasonryItems)
    }
    return () => window.removeEventListener('resize', resizeAllMasonryItems)
  }, [window, resizeAllMasonryItems])

  useEffect(() => {
    if (window) resizeAllMasonryItems()
  }, [window, resizeAllMasonryItems])

  return (
    <GridWrapper ref={ref} className='grid-wrapper'>
      <Grid className='grid'>
        {gifs?.map(gif => (
          <Gif key={gif.id} gif={gif} />
        ))}
        <div ref={ref} />
      </Grid>
    </GridWrapper>
  )
}

export default GifGrid
