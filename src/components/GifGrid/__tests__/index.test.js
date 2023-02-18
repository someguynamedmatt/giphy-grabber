import { render, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom'
import { giphyTrendingResponse } from '../../../fixtures'
import GifGrid from '../'

const mockGifs = { data: [...giphyTrendingResponse.data] }

const normalizeGiphyResponse = ({ data }) => {
  if (!data || !data.length) return { gifs: [] }
  return {
    gifs: data.map(i => ({
      id: i.id,
      url: i.url,
      username: i.username,
      title: i.title,
      images: i.images,
    })),
  }
}

jest.mock('../../../providers/gif-provider.js', () => ({
  ...jest.requireActual('../../../providers/gif-provider'),
  GifContext: {
    useContainer: () => ({ gifs: [...normalizeGiphyResponse(mockGifs).gifs] }),
  },
}))

const testId = 'grid-instance'

describe('components::Grid', () => {
  test('it renders as expected', async () => {
    const { getByTestId } = render(<GifGrid gifs={normalizeGiphyResponse(mockGifs)} />)
    const el = await waitForElement(() => getByTestId(testId))
    console.log(gifs.length)
    // expect(gif).not.toBeNull()
  })
})
