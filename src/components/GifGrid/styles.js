import styled from 'styled-components'

export const GridWrapper = styled.div`
  height: 100%;
`

export const Grid = styled.div`
  display: grid;
  grid-gap: 1px;
  grid-auto-rows: 0;
  max-width: 1280px;
  width: 100%;
  height: auto;
  /* grid-template-rows: auto; */

  @media screen and (min-width: 1317px) {
    grid-template-columns: repeat(4, minmax(200px, 1fr));
  }

  @media screen and (max-width: 1317px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }

  @media screen and (max-width: 865px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }

  @media screen and (max-width: 561px) {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
  }
`
