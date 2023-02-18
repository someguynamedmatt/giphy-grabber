export const normalizeGiphyResponse = ({ data }) => {
  if (!data || !data.length) return { gifs: [] }
  return data.map(i => ({
    id: i.id,
    url: i.url,
    username: i.username,
    title: i.title,
    images: i.images,
  }))
}
