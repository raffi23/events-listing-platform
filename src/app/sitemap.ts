import { config } from "@/config";
import { MetadataRoute } from "next";

const sitemap: () => MetadataRoute.Sitemap = () => [
  {
    url: config.baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: `${config.baseUrl}/events`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  },
];

export default sitemap;
