import { Gif } from './styles'
import Image from 'next/image'

const GifComponent = ({ gif }) => {
  const { height, width, url } = gif.images['fixed_width']
  return (
    <Gif data-testid='gif-instance'>
      <Image width={width} height={height} src={url} alt={gif.title} />
    </Gif>
  )
}

export default GifComponent
