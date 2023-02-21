import styled from 'styled-components'

export const GridWrapper = styled.div`
  height: 100%;
  margin-bottom: 50px;
`

export const Grid = styled.div`
  display: grid;
  grid-auto-rows: 0;
  grid-gap: 1px;
  height: auto;
  max-width: 1280px;
  width: 100%;

  @media screen and (min-width: 1317px) {
    grid-template-columns: repeat(4, minmax(200px, 1fr));
  }

  @media screen and (max-width: 1317px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }

  @media screen and (max-width: 865px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }

  @media screen and (max-width: 673px) {
    grid-template-columns: repeat(1, minmax(283px, 1fr));
  }
`

export const InfiniteScroll = styled.div`
  width: 100%;
  height: 100px;
`
