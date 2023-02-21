import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { giphyTrendingResponse as mockGifs } from '../../../fixtures'
import GifGrid, { testId } from '../'
import { normalizeGiphyResponse } from '@/utils'

jest.mock('../../../providers/gif-provider.js', () => ({
  ...jest.requireActual('../../../providers/gif-provider'),
  GifContext: {
    useContainer: () => ({
      gifs: normalizeGiphyResponse(mockGifs),
    }),
  },
}))

describe('components::Grid', () => {
  test('it renders a grid with five children', async () => {
    const { getByTestId } = render(<GifGrid gifs={normalizeGiphyResponse(mockGifs)} />)
    const grid = await waitFor(() => getByTestId(testId))
    expect(grid.children.length).toBe(5)
  })
})
