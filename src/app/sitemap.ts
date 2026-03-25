import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  // Replace with actual domain when purchased
  const URL = 'https://o-iqra.com.my';

  return [
    {
      url: URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
