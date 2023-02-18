import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import ResultsCallout, { testId } from '@/components/Header'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/global.styles'

describe('components::ResultsCallout', () => {
  test('it renders as expected', async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ResultsCallout />
      </ThemeProvider>
    )
    const resultsCallout = await waitFor(() => getByTestId(testId))
    expect(resultsCallout).not.toBeNull()
  })
})
