import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchHistory, { testId } from '@/components/Header'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/global.styles'

describe('components::SearchHistory', () => {
  test('it renders as expected', async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <SearchHistory />
      </ThemeProvider>
    )
    const searchBar = await waitFor(() => getByTestId(testId))
    expect(searchBar).not.toBeNull()
  })
})
