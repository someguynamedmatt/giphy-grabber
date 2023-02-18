import styled, { css } from 'styled-components'
import { styles } from '@/styles/global.styles'

const flex = css`
  display: flex;
  justify-content: center;
`

export const Body = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  height: 52px;
`

export const PreviousSearchesText = styled.div`
  ${flex}
  color: ${styles.color.gray.light};
  display: flex;
  flex-direction: column;
`

export const PreviousSearches = styled.button`
  align-items: center;
  ${flex}
  background: ${styles.color.black};
  border: 0;
  color: ${styles.color.cyan};
  cursor: pointer;
  text-decoration: underline;
`
