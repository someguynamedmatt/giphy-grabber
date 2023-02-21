import { useId } from 'react'
import { Gif, GifWrapper } from './styles'

const GifComponent = ({ gif }) => {
  const { height, width, url } = gif.images['fixed_width']
  const uuid = useId()

  return (
    <GifWrapper key={uuid} gridRowEnd={height} className='grid-item-wrapper'>
      <Gif
        className='grid-item'
        data-testid='gif-instance'
        src={url}
        height={height}
        width={width}
        alt={url}
      />
    </GifWrapper>
  )
}

/* <Placeholder className='grid-item' randomHeight={height} /> */
export default GifComponent
