import { normalizeGiphyResponse } from '@/utils'
const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY
const GIPHY_API_BASE = 'https://api.giphy.com/v1/gifs'

export default async function handler(req, res) {
  if (!GIPHY_API_KEY) return res.status(500).json({ error: 'configuration error' })

  const { q, page } = req.query || {}
  const trendingUrl = `${GIPHY_API_BASE}/trending?api_key=${GIPHY_API_KEY}&limit=25&rating=pg-13&offset=${page}`
  const searchUrl = `${GIPHY_API_BASE}/search?api_key=${GIPHY_API_KEY}&q=${q}&offset=${page}&limit=25&rating=pg-13&lang=en`
  const data = await fetch(q ? searchUrl : trendingUrl)
  const rawGiphyResponse = await data.json()

  res.status(rawGiphyResponse.meta.status).json(normalizeGiphyResponse(rawGiphyResponse))
}
