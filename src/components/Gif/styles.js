import styled from 'styled-components'

export const Gif = styled.div.attrs(p => ({
  style: {
    height: `${p.height}px`,
  },
}))`
  display: inline-block;
  width: 100%;
  background: url(${p => p.url});
  background-repeat: no-repeat;
  background-size: 100% ${p => p.height}px;
`
