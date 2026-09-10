import type { NextConfig } from "next";
import { resolve } from "path";

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    unoptimized: true,
  },
  outputFileTracingExcludes: {
    "*": [
      "./node_modules/sharp/**/*",
      "./node_modules/@img/**/*",
      "**/node_modules/sharp/**",
      "**/node_modules/@img/**",
    ],
  },
  serverExternalPackages: ["jose"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'; frame-src 'self' blob: https://cdn.sanity.io https://*.zoom.us https://app.zoom.us https://www.youtube.com https://www.youtube-nocookie.com;",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(self \"https://*.zoom.us\" \"https://app.zoom.us\"), microphone=(self \"https://*.zoom.us\" \"https://app.zoom.us\"), display-capture=(self \"https://*.zoom.us\" \"https://app.zoom.us\")",
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (isServer && process.env.NODE_ENV === "production") {
      const emptyModule = resolve(process.cwd(), "src/lib/empty-module.js");
      config.resolve = config.resolve || {};
      config.resolve.alias = {
        ...config.resolve.alias,
        "firebase/app": emptyModule,
        "firebase/auth": emptyModule,
        "firebase/firestore": emptyModule,
        "firebase/storage": emptyModule,
        "firebase/analytics": emptyModule,
        "@/lib/firebase": emptyModule,
        "@react-pdf/renderer": emptyModule,
        "firebase-admin": emptyModule,
        "firebase-admin/app": emptyModule,
        "firebase-admin/firestore": emptyModule,
        "firebase-admin/auth": emptyModule,
        "sharp": emptyModule,
      };
    }
    return config;
  },
};

export default nextConfig;
