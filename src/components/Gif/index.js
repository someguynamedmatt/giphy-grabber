import { useRef, useId, useEffect, useState } from 'react'
import { Gif, GifWrapper, Placeholder } from './styles'

export const testId = 'gif-instance'

const GifComponent = ({ gif }) => {
  const { height, width, url } = gif.images['fixed_width']
  const [loaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)
  const uuid = useId()

  const setLoaded = () => {
    setIsLoaded(true)
  }

  useEffect(() => {
    const currentRef = imgRef?.current
    if (currentRef) imgRef.current?.addEventListener('load', setLoaded)
    return () => {
      currentRef?.removeEventListener('load', setLoaded)
    }
  }, [])

  return (
    <GifWrapper key={uuid} gridRowEnd={height} className='grid-item-wrapper'>
      <Placeholder
        style={loaded ? { display: 'none' } : { display: 'block' }}
        className='grid-item'
        randomHeight={height}
        width={width}
      />
      <Gif
        style={loaded && { display: 'block' }}
        ref={imgRef}
        className='grid-item'
        data-testid={testId}
        src={url}
        height={height}
        width={width}
        alt={url}
        unoptimized={true}
      />
    </GifWrapper>
  )
}

export default GifComponent
