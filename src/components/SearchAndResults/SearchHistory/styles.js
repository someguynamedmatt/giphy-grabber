import styled, { css } from 'styled-components'

const flex = css`
  display: flex;
  justify-content: center;
`

export const SearchHistory = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  height: 52px;
`

export const PreviousSearchesText = styled.div`
  ${flex}
  color: ${p => p.theme.color.gray.light};
  display: flex;
  flex-direction: column;
`

export const PreviousSearches = styled.button`
  align-items: center;
  ${flex}
  background: ${p => p.theme.color.black};
  border: 0;
  color: ${p => p.theme.color.cyan};
  cursor: pointer;
  text-decoration: underline;
`
