import styled from 'styled-components'

export const HeaderBody = styled.div`
  color: ${p => p.theme.color.white};
  display: flex;
  font: normal normal 900 28px/34px Lato;
  height: 34px;
  left: 157px;
  letter-spacing: 0px;
  opacity: 1;
  text-align: left;
  text-transform: uppercase;
  top: 12px;

  & > div {
    display: inline-block;
    margin-left: 12px;
  }
`
