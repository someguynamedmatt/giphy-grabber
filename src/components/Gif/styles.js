import styled from 'styled-components'
import Image from 'next/image'

export const GifWrapper = styled.div`
  position: relative;
  height: max-content;
  grid-row-end: ${p => p.bottom};
`

export const Gif = styled(Image)`
  width: 100%;
`

export const Placeholder = styled.div`
  width: 100%;
  height: ${p => p.randomHeight}px;
  background: transparent linear-gradient(232deg, #121212 0%, #606060 100%) 0% 0% no-repeat
    padding-box;
  opacity: 1;
`
