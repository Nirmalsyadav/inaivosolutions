import { useEffect, useMemo } from 'react'
import { createWebPageSchema, seoConfig, toAbsoluteUrl } from '../data/seo'

function upsertMetaTag({ name, property, content }) {
  if (!content) return
  const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    if (name) element.setAttribute('name', name)
    if (property) element.setAttribute('property', property)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

function normalizePath(path = '/') {
  if (!path) return '/'
  return path.startsWith('/') ? path : `/${path}`
}

function toAbsoluteImageUrl(imagePath) {
  if (/^https?:\/\//i.test(imagePath)) return imagePath
  return toAbsoluteUrl(imagePath.startsWith('/') ? imagePath : `/${imagePath}`)
}

function Seo({
  title = seoConfig.defaultTitle,
  description = seoConfig.defaultDescription,
  path = '/',
  imagePath = seoConfig.defaultImagePath,
  type = 'website',
  keywords = seoConfig.defaultKeywords,
  noindex = false,
  schema = [],
}) {
  const normalizedPath = normalizePath(path)
  const canonicalUrl = toAbsoluteUrl(normalizedPath)
  const imageUrl = toAbsoluteImageUrl(imagePath)
  const robots = noindex ? 'noindex, nofollow, noarchive' : 'index, follow, max-image-preview:large'

  const schemaList = useMemo(() => {
    if (Array.isArray(schema)) return schema.filter(Boolean)
    return schema ? [schema] : []
  }, [schema])

  const defaultWebPageSchema = useMemo(
    () => createWebPageSchema({ title, description, path: normalizedPath }),
    [title, description, normalizedPath],
  )

  const schemaJsonList = useMemo(
    () => [defaultWebPageSchema, ...schemaList].map((entry) => JSON.stringify(entry)),
    [defaultWebPageSchema, schemaList],
  )

  useEffect(() => {
    document.documentElement.setAttribute('lang', 'en')
    document.title = title

    upsertMetaTag({ name: 'description', content: description })
    upsertMetaTag({ name: 'keywords', content: keywords })
    upsertMetaTag({ name: 'robots', content: robots })
    upsertMetaTag({ name: 'theme-color', content: '#05070E' })

    upsertMetaTag({ property: 'og:type', content: type })
    upsertMetaTag({ property: 'og:title', content: title })
    upsertMetaTag({ property: 'og:description', content: description })
    upsertMetaTag({ property: 'og:url', content: canonicalUrl })
    upsertMetaTag({ property: 'og:image', content: imageUrl })
    upsertMetaTag({ property: 'og:site_name', content: seoConfig.siteName })
    upsertMetaTag({ property: 'og:locale', content: 'en_US' })

    upsertMetaTag({ name: 'twitter:card', content: 'summary_large_image' })
    upsertMetaTag({ name: 'twitter:title', content: title })
    upsertMetaTag({ name: 'twitter:description', content: description })
    upsertMetaTag({ name: 'twitter:image', content: imageUrl })
    upsertMetaTag({ name: 'twitter:url', content: canonicalUrl })

    upsertCanonical(canonicalUrl)

    document.querySelectorAll('script[data-seo-managed="true"]').forEach((node) => node.remove())

    schemaJsonList.forEach((entryJson) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-seo-managed', 'true')
      script.text = entryJson
      document.head.appendChild(script)
    })
  }, [canonicalUrl, description, imageUrl, keywords, robots, schemaJsonList, title, type])

  return null
}

export default Seo
