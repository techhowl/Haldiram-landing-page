import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
    // Some placeholder assets in /public/images are hand-authored SVGs (no
    // scripts/external refs), so they're safe to render inline. Note:
    // "attachment" disposition — the docs' recommended pairing with
    // dangerouslyAllowSVG — forces ALL optimized images (including real
    // photos) to be served as downloads instead of rendering inline, so it
    // must stay "inline" here.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
