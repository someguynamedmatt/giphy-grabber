import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { giphyTrendingResponse } from '../../../fixtures'
import Gif, { testId } from '../'

const mockGif = {
  ...giphyTrendingResponse.data[0],
}

jest.mock('@/providers', () => ({
  GifContext: {
    useContainer: () => ({
      loading: false,
    }),
  },
}))

describe('components::Gif', () => {
  test('it renders as expected', () => {
    render(<Gif gif={mockGif} />)
    const gif = screen.getByTestId(testId)
    expect(gif).not.toBeNull()
  })
})
