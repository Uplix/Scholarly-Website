import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap{
    return [
        {
            url: 'https://thescholarly.app',
            lastModified:new Date(),
            priority:1
        },
        {
            url: 'https://thescholarly.app/go/about',
            lastModified:new Date(),
            priority:0.9
        },
        {
            url: 'https://thescholarly.app/login',
            lastModified:new Date(),
            priority:0.8
        },
        {
            url: 'https://thescholarly.app/go/contact',
            lastModified:new Date(),
            priority:0.7
        },
        {
            url: 'https://thescholarly.app/go/team',
            lastModified:new Date(),
        }
    ]
}