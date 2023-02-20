import { useCallback, useEffect, useState, useRef } from 'react'
import { Gif, GifWrapper, Placeholder } from './styles'
import { useThrottleFn } from 'react-use'

const GifComponent = ({ gif }) => {
  const { height, width, url } = gif.images['fixed_width']
  const [gifHeight, setGifHeight] = useState(0)
  const [loaded, setLoaded] = useState()
  const ref = useRef(null)

  const calculateGifSize = useCallback(() => {
    const containerWidth = ref?.current?.clientWidth
    const ratio = width / height
    const neededContainerHeight = containerWidth / ratio
    setGifHeight(neededContainerHeight)
    return neededContainerHeight
  }, [width, height, ref?.current])

  /* const gifHeight = useThrottleFn(calculateGifSize, 250, [width, height]) */

  useEffect(() => {
    calculateGifSize()
  }, [calculateGifSize])

  useEffect(() => {
    setTimeout(() => {
      /* setLoaded(true) */
    }, 3000)
  }, [])

  const applyTo = useCallback(
    i => {
      setLoaded(true)
    },
    [loaded]
  )

  return (
    <GifWrapper ref={ref} gridRowEnd={height} className='grid-item-wrapper'>
      <Gif
        className='grid-item'
        data-testid='gif-instance'
        src={url}
        height={height}
        width={width}
        onLoadingComplete={i => applyTo(i)}
      />
    </GifWrapper>
  )
}

/* <Placeholder className='grid-item' randomHeight={height} /> */
export default GifComponent
