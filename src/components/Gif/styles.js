import styled from 'styled-components'

export const Gif = styled.div`
  display: inline-block;
  width: 100%;
  height: ${p => p.height}px;
  background: url(${p => p.url});
  background-repeat: no-repeat;
  background-size: 100% ${p => p.height}px;
`
