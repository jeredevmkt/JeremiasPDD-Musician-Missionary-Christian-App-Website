import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Cambia esto por tu URL de Vercel o dominio final
  const baseUrl = "https://jeremiaspdd.velcel.app";

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/donation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/performances`,
      lastModified: new Date(),
      changeFrequency: "monthly", // 👈 Cambiado a monthly (cada 3 meses aprox)
      priority: 0.8,
    },
    {
      url: `${baseUrl}/playbacks`,
      lastModified: new Date(),
      changeFrequency: "monthly", // 👈 Cambiado a monthly (cada 3 meses aprox)
      priority: 0.7,
    },
    {
      url: `${baseUrl}/songs`,
      lastModified: new Date(),
      changeFrequency: "monthly", // 👈 Cambiado a monthly (cada 3 meses aprox)
      priority: 0.7,
    },
    {
      url: `${baseUrl}/testimonies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
