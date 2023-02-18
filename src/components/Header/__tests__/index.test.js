import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header, { testId } from '@/components/Header'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/global.styles'

describe('components::Header', () => {
  test('it renders as expected', async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    )
    const header = await waitFor(() => getByTestId(testId))
    expect(header).not.toBeNull()
  })
})
