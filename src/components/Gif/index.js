import { useCallback, useEffect, useState, useRef } from 'react'
import { Gif, GifWrapper, Placeholder } from './styles'
import { useThrottleFn } from 'react-use'

const GifComponent = ({ gif }) => {
  const { height, width, url } = gif.images['fixed_width']
  const [gifHeight, setGifHeight] = useState(0)
  const [loaded, setLoaded] = useState(false)
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

  return (
    <GifWrapper ref={ref} className='grid-item-wrapper'>
      {loaded ? (
        <Gif
          className='grid-item'
          data-testid='gif-instance'
          src={url}
          height={gifHeight ?? height}
          width={width}
          onLoadingComplete={() => setLoaded(true)}
        />
      ) : (
        <Placeholder className='grid-item' randomHeight={Math.random() * 340} />
      )}
    </GifWrapper>
  )
}

export default GifComponent
