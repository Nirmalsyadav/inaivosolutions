const defaultSiteUrl = 'https://www.inaivosolutions.com'

export const seoConfig = {
  siteName: 'Inaivo Solutions',
  siteUrl: (import.meta.env.VITE_SITE_URL || defaultSiteUrl).replace(/\/+$/, ''),
  defaultTitle: 'Inaivo Solutions | Web Development, SaaS & Digital Product Agency',
  defaultDescription:
    'Inaivo Solutions builds modern web applications, SaaS platforms, marketplace systems, and growth-focused digital experiences for ambitious businesses.',
  defaultImagePath: '/og-image.png',
  defaultKeywords:
    'Inaivo Solutions, web development company, SaaS development, marketplace development, web applications, digital marketing agency, graphic design and branding',
  contactEmail: 'admin@inaivosolutions.com',
}

const normalizePath = (path = '/') => {
  if (!path.startsWith('/')) return `/${path}`
  return path
}

export const toAbsoluteUrl = (path = '/') => `${seoConfig.siteUrl}${normalizePath(path)}`

export const pageSeo = {
  home: {
    title: 'Inaivo Solutions | Web Development, SaaS & Digital Product Agency',
    description:
      'We build modern web apps, SaaS products, marketplaces, and growth-focused digital platforms with premium UI and high-performance engineering.',
    path: '/',
  },
  services: {
    title: 'Services | Inaivo Solutions',
    description:
      'Explore Inaivo Solutions services: Web Development, Web Applications, SaaS Development, Marketplace Platforms, Digital Marketing, and Branding.',
    path: '/services',
  },
  solutions: {
    title: 'Solutions | Inaivo Solutions',
    description:
      'Tailored product solutions for SaaS platforms, marketplace systems, startup MVPs, and business portals engineered for scale.',
    path: '/solutions',
  },
  work: {
    title: 'Portfolio & Case Studies | Inaivo Solutions',
    description:
      'See real project outcomes across SaaS, marketplace, and business portal engagements delivered by Inaivo Solutions.',
    path: '/work',
  },
  about: {
    title: 'About Inaivo Solutions | Product-Focused Software Partner',
    description:
      'Learn about Inaivo Solutions mission, technology expertise, and why growth-focused teams choose us for product delivery.',
    path: '/about',
  },
  contact: {
    title: 'Contact Inaivo Solutions | Book a Free Strategy Call',
    description:
      'Contact Inaivo Solutions to discuss your next software project. Get a practical roadmap for launch, scale, and growth.',
    path: '/contact',
  },
  training: {
    title: 'Training & Internship | Inaivo Solutions',
    description:
      'Practical training and internship programs focused on MERN, React Native, and Python backend development with real project experience.',
    path: '/training',
  },
  pricing: {
    title: 'Pricing | Inaivo Solutions',
    description:
      'Flexible pricing plans for startup, growth, and scale-stage teams. Tailored scope based on delivery needs and technical complexity.',
    path: '/pricing',
  },
  notFound: {
    title: 'Page Not Found | Inaivo Solutions',
    description: 'The page you requested does not exist. Explore Inaivo Solutions services and case studies from the homepage.',
    path: '/404',
  },
}

export function createWebPageSchema({ title, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: toAbsoluteUrl(path),
    inLanguage: 'en',
  }
}

export function createBreadcrumbSchema(items = []) {
  if (!items.length) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  }
}

export function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoConfig.siteName,
    url: toAbsoluteUrl('/'),
    logo: toAbsoluteUrl('/logo-mark.png'),
    email: seoConfig.contactEmail,
    sameAs: [
      'https://www.linkedin.com/company/inaivosolutions',
      'https://www.instagram.com/inaivosolutions',
      'https://www.facebook.com/inaivosolutions',
    ],
  }
}

export function createProfessionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: seoConfig.siteName,
    url: toAbsoluteUrl('/'),
    image: toAbsoluteUrl('/og-image.png'),
    email: seoConfig.contactEmail,
    areaServed: 'Worldwide',
    serviceType: [
      'Web Development',
      'Web Applications',
      'SaaS Development',
      'Classified Marketplace Platforms',
      'Digital Marketing',
      'Graphic Design & Branding',
    ],
  }
}
