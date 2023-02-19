import styled from 'styled-components'

export const GridWrapper = styled.div``

export const Grid = styled.div`
  display: grid;
  grid-gap: 1px;
  /* grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); */
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  grid-auto-rows: 0;
  max-width: 1280px;
  width: 100%;

  @media screen and (min-width: 1042px) {
    grid-template-columns: repeat(4, minmax(200px, 1fr));
  }

  @media screen and (max-width: 1041px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }

  @media screen and (max-width: 865px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }

  @media screen and (max-width: 561px) {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
  }
`
