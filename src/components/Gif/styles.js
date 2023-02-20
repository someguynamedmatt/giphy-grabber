import styled from 'styled-components'

export const GifWrapper = styled.div`
  position: relative;
`

export const Gif = styled.div`
  position: relative;
  height: ${p => p.height}px;
  background: url(${p => p.url});
  background-repeat: no-repeat;
  background-size: 100% ${p => p.height}px;
`
