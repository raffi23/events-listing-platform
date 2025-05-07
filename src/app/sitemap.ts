import { appConfig } from "@/config";
import { MetadataRoute } from "next";

const sitemap: () => MetadataRoute.Sitemap = () => [
  {
    url: appConfig.baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: `${appConfig.baseUrl}/events`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  },
];

export default sitemap;
