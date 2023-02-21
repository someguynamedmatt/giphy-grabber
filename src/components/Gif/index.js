import { useRef, useId, useEffect, useState, useCallback } from 'react'
import { Gif, GifWrapper, Placeholder } from './styles'

export const testId = 'gif-instance'

const GifComponent = ({ gif }) => {
  const { height, width, url } = gif.images['fixed_width']
  const [loaded, setIsLoaded] = useState(false)
  const [gifHeight, setGifHeight] = useState()
  const imgRef = useRef(null)
  const wrapperRef = useRef(null)
  const uuid = useId()

  const setLoaded = () => {
    setIsLoaded(true)
  }

  const calculateGifSize = useCallback(() => {
    const containerWidth = wrapperRef?.current?.clientWidth
    const ratio = width / height
    const neededContainerHeight = containerWidth / ratio
    setGifHeight(neededContainerHeight)
  }, [width, height])

  useEffect(() => {
    calculateGifSize()
    if (globalThis?.window) window.addEventListener('scroll', calculateGifSize)
    if (globalThis?.window) window.addEventListener('resize', calculateGifSize)
  }, [calculateGifSize])

  useEffect(() => {
    const currentRef = imgRef?.current
    if (currentRef) imgRef.current?.addEventListener('load', setLoaded)
    return () => {
      currentRef?.removeEventListener('load', setLoaded)
    }
  }, [])

  return (
    <GifWrapper ref={wrapperRef} key={uuid} gridRowEnd={height} className='grid-item-wrapper'>
      <Placeholder
        style={loaded ? { display: 'none' } : { display: 'block' }}
        randomHeight={gifHeight || height}
        width={width}
      />
      <Gif
        style={loaded && { display: 'block' }}
        ref={imgRef}
        className='grid-item'
        data-testid={testId}
        src={url}
        height={gifHeight || height}
        width={width}
        alt={url}
        unoptimized={true}
      />
    </GifWrapper>
  )
}

export default GifComponent
