import styled from 'styled-components'

export const Grid = styled.div`
  column-gap: 0%;
  margin: 0 auto;

  @media screen and (min-width: 1042px) {
    column-count: 4;
  }

  @media screen and (max-width: 1041px) {
    column-count: 3;
  }

  @media screen and (max-width: 865px) {
    column-count: 2;
  }

  @media screen and (max-width: 561px) {
    column-count: 1;
  }
`
