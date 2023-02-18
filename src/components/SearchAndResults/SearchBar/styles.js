import styled from 'styled-components'
import { styles } from '@/styles/global.styles'

export const Body = styled.div`
  position: sticky;
  display: flex;
  width: 100%;
  margin: auto;
  height: 52px;
  background-color: ${styles.color.white};
`

export const Input = styled.input`
  color: ${styles.color.charcoal};
  width: 100%;
  padding: 12px 18px;
`
