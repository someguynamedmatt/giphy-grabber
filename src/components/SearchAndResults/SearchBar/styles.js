import styled from 'styled-components'

export const Search = styled.div`
  cursor: pointer;
  position: sticky;
  display: flex;
  width: 100%;
  margin: auto;
  height: 52px;
  background-color: ${p => p.theme.color.white};
`

export const Input = styled.input`
  color: ${p => p.theme.color.charcoal};
  width: 100%;
  padding: 12px 18px;
`
