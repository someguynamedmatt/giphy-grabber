import { useCallback, useEffect, useState, useRef } from 'react'
import { Gif } from './styles'

const GifComponent = ({ gif }) => {
  const { height, width, url } = gif.images['fixed_width']
  const [gifHeight, setGifHeight] = useState(0)
  const window = globalThis?.window
  const ref = useRef(null)

  const calculateGifSize = useCallback(() => {
    const containerWidth = ref?.current?.clientWidth
    const ratio = width / height
    const neededContainerHeight = containerWidth / ratio

    setGifHeight(neededContainerHeight)
  }, [width, height])

  useEffect(() => {
    if (!window) return

    window.addEventListener('resize', calculateGifSize)

    return () => {
      window.removeEventListener('resize', calculateGifSize)
    }
  }, [calculateGifSize, window])

  useEffect(() => {
    calculateGifSize()
  }, [calculateGifSize])

  return <Gif ref={ref} data-testid='gif-instance' height={gifHeight} url={url} />
}

export default GifComponent
