import styled from 'styled-components'
import { styles } from '@/styles/global.styles'

export const HeaderBody = styled.div`
  top: 12px;
  left: 157px;
  height: 34px;
  text-align: left;
  font: normal normal 900 28px/34px Lato;
  letter-spacing: 0px;
  color: ${styles.color.white};
  text-transform: uppercase;
  opacity: 1;

  & > span {
    margin-left: 12px;
  }
`
