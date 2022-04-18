export function urlStripper (url: string, cb?: (url: string) => void): string {
  const stipped = url.replace(/^https?:\/\//, '').replace(/\/.*/, '').trim()
  if (cb) cb(stipped)
  return stipped
}
