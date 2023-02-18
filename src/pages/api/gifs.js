import { normalizeGiphyResponse } from '@/utils'
const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY
const GIPHY_API_BASE = 'https://api.giphy.com/v1/gifs'

export default async function handler(req, res) {
  if (!GIPHY_API_KEY) return res.status(401).json({ error: 'GIPHY API Key is invalid/missing' })

  let url = `${GIPHY_API_BASE}/trending?api_key=${GIPHY_API_KEY}&limit=25&rating=g`
  if (req.query && Object.keys(req.query).length) {
    const { q, page } = req.query
    url = `${GIPHY_API_BASE}/search?api_key=${GIPHY_API_KEY}&q=${q}&offset=${
      page ?? 0
    }&limit=25&rating=g&lang=en`
  }
  const data = await fetch(url)
  const rawGiphyResponse = await data.json()

  // TODO: this status should be dictated by the `meta` field on the response
  res.status(200).json(normalizeGiphyResponse(rawGiphyResponse))
}
