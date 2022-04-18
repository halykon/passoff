export function urlStripper (url: string): string {
  // remove url protocol and path
  return url.replace(/^https?:\/\//, '').replace(/\/.*/, '').trim()
}

export function isValidUrl (url: string) {
  return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(url)
}

export function urlAddProtocol (url: string) {
  if (/^https?:\/\//.test(url)) return url
  return `http://${url}`
}

interface IMetaAll {
  meta?: Record<string, string>
  favicons?: Array<{
    rel: string
    href: string
  }>
}

export function fetchMetaAll (url: string) {
  const stipped = urlStripper(url)
  return fetch(`https://metascrape.vercel.app/api?url=http://${stipped}`).then<IMetaAll>(res => res.json())
}

export async function fetchMeta (url: string) {
  const meta = await fetchMetaAll(url)

  const favicon = meta.favicons?.find(favicon => favicon.rel === 'icon')?.href ?? meta.favicons?.[0].href
  const color = meta.meta?.['theme-color']

  return { favicon, color }
}
