import { createGlobalStyle } from 'styled-components'

export const theme = {
  color: {
    black: '#000000',
    charcoal: '#3B3B3B',
    cyan: '#00CCFF',
    gray: {
      light: '#B2B2B2',
      regular: '#707070',
      dark: '#606060',
    },
    obsidian: '#121212',
    white: '#FFFFFF',
  },
}

export const GlobalStyles = createGlobalStyle`
html {
  font-family: 'Lato', sans-serif;
  background-color: ${theme.color.black};
}

main {
  margin: 0 auto;
  max-width: 800px;
  padding: 0 120px;
}

`
