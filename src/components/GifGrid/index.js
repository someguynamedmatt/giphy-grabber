import { useId, useRef, useEffect, useState } from 'react'
import { InfiniteScroll as ScrollFlag, Grid, GridWrapper } from './styles'
import { Gif } from '@/components'
import { GifContext } from '@/providers'
import { useGridResizer } from '@/hooks'
import { useIntersection } from 'react-use'

export const testId = 'grid-instance'

const GifGrid = () => {
  const { window } = globalThis
  const { gifs, fetchGifs, searchTerm } = GifContext.useContainer()
  const { resizeAllGridItems } = useGridResizer()
  const uuid = useId()
  const flag = useRef(null)
  const [fetchMore, setFetchMore] = useState(false)
  const intersection = useIntersection(flag, {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  })

  useEffect(() => {
    if (fetchMore) {
      fetchGifs({ query: searchTerm }).then(() => {
        setFetchMore(false)
      })
    }
  }, [fetchMore])

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
