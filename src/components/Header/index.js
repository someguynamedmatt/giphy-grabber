import { HeaderBody } from './styles'
import Image from 'next/image'

const giphyGrabber = 'giphy grabber'
const altText = 'giphy grabber icon'
const iconSrc = '/giphy_grabber_icon.webp'

export const testId = 'header-instance'

const Header = () => {
  return (
    <HeaderBody data-testid={testId}>
      <Image alt={altText} src={iconSrc} height={29} width={25} />
      <span>{giphyGrabber}</span>
    </HeaderBody>
  )
}

export default Header
