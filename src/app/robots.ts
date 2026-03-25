import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  // Replace with actual domain later
  const URL = 'https://o-iqra.com.my';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${URL}/sitemap.xml`,
  }
}
