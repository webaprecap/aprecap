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
