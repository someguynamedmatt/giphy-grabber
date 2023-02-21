import { normalizeGiphyResponse } from '@/utils'
import { GIPHY_API_KEY, giphySearchUrl, giphyTrendingUrl } from '@/constants'

export default async function handler(req, res) {
  if (!GIPHY_API_KEY) return res.status(500).json({ error: 'configuration error' })
  const { q, page } = req.query || {}
  const data = await fetch(q ? giphySearchUrl(q, page) : giphyTrendingUrl(page))
  const rawGiphyResponse = await data.json()
  res.status(rawGiphyResponse.meta.status).json(normalizeGiphyResponse(rawGiphyResponse))
}
