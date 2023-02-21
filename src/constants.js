export const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY
export const GIPHY_API_BASE = 'https://api.giphy.com/v1/gifs'
const giphySearchUrl = (q = '', page = 1) =>
  `${GIPHY_API_BASE}/search?api_key=${GIPHY_API_KEY}&q=${q}&offset=${page}&limit=20&rating=g`
const giphyTrendingUrl = (page = 1) =>
  `${GIPHY_API_BASE}/trending?api_key=${GIPHY_API_KEY}&limit=25&rating=pg-13&offset=${page}`
