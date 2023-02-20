import { useRef, useEffect, useCallback, useState, useMemo, createElement } from 'react'
import { createPortal, findDOMNode } from 'react-dom'
import { InfiniteScroll, Grid, GridWrapper } from './styles'
import { Gif } from '@/components'
import { GifContext } from '@/providers'
import { useIntersection } from 'react-use'
import { useDebounce } from 'react-use'

const GifGrid = () => {
  const { gifs, fetchGifs, searchTerm } = GifContext.useContainer()
  const flag = useRef(null)
  const [startPointer, setStartPointer] = useState(null)
  const intersection = useIntersection(flag, {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  })
  const { window, document } = globalThis

  const resizeMasonryItem = ({ item, rowGap, rowHeight }) => {
    const gridItemRect = item.querySelector('.grid-item').getBoundingClientRect()
    const rowSpan = Math.ceil((gridItemRect.height + rowGap) / (rowHeight + rowGap))
    item.style.gridRowEnd = `span ${rowSpan > 1 ? rowSpan : Math.ceil(gridItemRect.bottom)}`
    return Math.ceil(gridItemRect.bottom)
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

  const intersectionCb = () => {
    if (intersection?.isIntersecting) {
      fetchGifs({ query: searchTerm })
    }
  }

  useEffect(() => {
    setStartPointer(gifs.length - 1)
  }, [])

  useEffect(() => {
    if (window) {
      window.addEventListener('resize', resizeAllMasonryItems)
      window.addEventListener('scroll', intersectionCb)
    }
    return () => {
      window.removeEventListener('resize', resizeAllMasonryItems)
      window.removeEventListener('scroll', intersectionCb)
    }
  }, [window, resizeAllMasonryItems, intersectionCb])

  useEffect(() => {
    if (window) resizeAllMasonryItems()
  }, [window, resizeAllMasonryItems, gifs.length])

  return (
    <GridWrapper className='grid-wrapper'>
      <Grid className='grid'>
        <>
          {gifs?.map(g => (
            <Gif key={g?.id} gif={g} />
          ))}
          <InfiniteScroll ref={flag} />
        </>
      </Grid>
    </GridWrapper>
  )
}

export default GifGrid
