/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — emitted to `out/` on `npm run build`.
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // GitHub Pages user-site ⇒ served from repo root.
  basePath: '',
  assetPrefix: '',
}

export default nextConfig
