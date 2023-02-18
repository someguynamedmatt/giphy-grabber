import { useEffect } from 'react'

const GIPHY_API_KEY = process.env.GIPHY_API_KEY

export const useGiphyApi = () => {
  // TODO: this might be better served higher up in the chain
  if (!GIPHY_API_KEY) {
    console.error('[ERROR]: Giphy API key was not provided')
  }
}
