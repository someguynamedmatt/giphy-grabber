import { useId, useRef, useEffect, useState, useCallback } from 'react'
import { InfiniteScroll as ScrollFlag, Grid, GridWrapper } from './styles'
import { Gif } from '@/components'
import { GifContext } from '@/providers'
import { useIntersection } from 'react-use'

export const testId = 'grid-instance'

const GifGrid = () => {
  const { window } = globalThis
  const { gifs, fetchGifs, searchTerm } = GifContext.useContainer()
  const uuid = useId()
  const flag = useRef(null)
  const [fetchMore, setFetchMore] = useState(false)
  const intersection = useIntersection(flag, {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  })

  const resizeGridItem = ({ item, rowGap, rowHeight }) => {
    const gridItemRect = item.querySelector('.grid-item').getBoundingClientRect()
    const rowSpan = Math.ceil((gridItemRect.height + rowGap) / (rowHeight + rowGap))
    item.style.gridRowEnd = `span ${rowSpan > 1 ? rowSpan : Math.ceil(gridItemRect.bottom)}`
    return Math.ceil(gridItemRect.bottom)
  }

  const resizeAllGridItems = useCallback(() => {
    const grid = document?.getElementsByClassName('grid')[0]
    const allItems = document?.getElementsByClassName('grid-item-wrapper')
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('row-gap'))
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'))

    for (let i = 0; i < allItems.length; i++) {
      resizeGridItem({ item: allItems[i], rowGap, rowHeight })
    }
  }, [])

  useEffect(() => {
    if (fetchMore) {
      fetchGifs({ query: searchTerm }).then(() => {
        setFetchMore(false)
      })
    }
  }, [fetchMore, fetchGifs, searchTerm])

  useEffect(() => {
    const intersectionCb = () => {
      if (intersection?.intersectionRatio > 0 && !fetchMore) {
        setFetchMore(true)
      }
    }

    if (window) {
      window.addEventListener('resize', resizeAllGridItems)
      window.addEventListener('scroll', intersectionCb)
    }
    return () => {
      window.removeEventListener('resize', resizeAllGridItems)
      window.removeEventListener('scroll', intersectionCb)
    }
  }, [window, resizeAllGridItems, fetchMore, intersection?.intersectionRatio])

  useEffect(() => {
    if (window) resizeAllGridItems()
  }, [window, resizeAllGridItems, gifs])

  return (
    <>
      <GridWrapper className='grid-wrapper'>
        <>
          <Grid className='grid' data-testid={testId}>
            {gifs?.map((g, i) => (
              <Gif key={`${uuid}-${g.id}-${i}`} gif={g} />
            ))}
          </Grid>
          <ScrollFlag ref={flag} />
        </>
      </GridWrapper>
    </>
  )
}

export default GifGrid
