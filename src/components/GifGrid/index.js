import { useRef, useEffect, useCallback, useState } from 'react'
import { findDOMNode } from 'react-dom'
import { Grid, GridWrapper } from './styles'
import { Gif } from '@/components'
import { GifContext } from '@/providers'
import { useIntersection } from 'react-use'
import { useDebounce } from 'react-use'

function resizeMasonryItem({ item, rowGap, rowHeight }) {
  const rowSpan = Math.ceil(
    (item.querySelector('.grid-item').getBoundingClientRect().height + rowGap) /
      (rowHeight + rowGap)
  )
  item.style.gridRowEnd = 'span ' + rowSpan
}

/* function waitForImages() {
 *   const allItems = document?.getElementsByClassName('grid-item-wrapper')
 *   const gridWrapper = document?.getElementsByClassName('grid-wrapper')[0]
 *   const gridWrapperWidth = globalThis?.window?.getComputedStyle(gridWrapper).width
 *   for (var i = 0; i < allItems.length; i++) {
 *     resizeMasonryItem(allItems[i])
 *   }
 * }
 *  */
/* function resizeAllMasonryItems() {
 *   const grid = document?.getElementsByClassName('grid')[0]
 *   const allItems = document?.getElementsByClassName('grid-item-wrapper')
 *   const rowGap = parseInt(globalThis?.window.getComputedStyle(grid).getPropertyValue('row-gap'))
 *   const rowHeight = parseInt(
 *     globalThis?.window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
 *   )
 *
 *   for (let i = 0; i < allItems.length; i++) {
 *     resizeMasonryItem({ item: allItems[i], rowGap, rowHeight })
 *   }
 * }
 *  */
const GifGrid = () => {
  const { gifs, fetchWithQuery, currentSearchTerm, setGifs } = GifContext.useContainer()
  const pageRef = useRef(1)
  const ref = useRef(null)
  const intersection = useIntersection(ref, { root: null, rootMargin: '0px', threshold: 0.5 })

  const resizeAllMasonryItems = () => {
    const grid = document?.getElementsByClassName('grid')[0]
    const allItems = document?.getElementsByClassName('grid-item-wrapper')
    const rowGap = parseInt(globalThis?.window.getComputedStyle(grid).getPropertyValue('row-gap'))
    const rowHeight = parseInt(
      globalThis?.window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
    )

    for (let i = 0; i < allItems.length; i++) {
      resizeMasonryItem({ item: allItems[i], rowGap, rowHeight })
    }
  }

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
    if (globalThis?.window) {
      globalThis?.window.addEventListener('resize', resizeAllMasonryItems)
    }
    return () => globalThis?.window.removeEventListener('resize', resizeAllMasonryItems)
  }, [globalThis?.window, resizeAllMasonryItems])

  useEffect(() => {
    if (globalThis?.window) resizeAllMasonryItems()
  }, [resizeAllMasonryItems])

  useEffect(() => {
    /* const fn = async () => {
     *   if (intersection?.intersectionRatio) {
     *     console.log('INTERSECTION')
     *     pageRef.current += 1
     *     const newBatch = await fetchWithQuery({ query: currentSearchTerm, page: pageRef.current })
     *     console.log('INTERSECTION', newBatch)
     *     if (newBatch?.length) {
     *       setGifs([...gifs, ...newBatch])
     *     }
     *   }
     * }
     * fn() */
  }, [intersection?.intersectionRatio])

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
