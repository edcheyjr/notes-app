import { FetchTimoutOptions } from './../type'

export default async function fetchWithTimeout(
  resource: string,
  options: FetchTimoutOptions
) {
  const { timeout = 8000 } = options

  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  })
  clearTimeout(id)

  return response
}
