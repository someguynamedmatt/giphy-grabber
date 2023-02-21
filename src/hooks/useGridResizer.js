import { useCallback } from 'react'

export const useGridResizer = () => {
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

  return { resizeAllGridItems }
}
