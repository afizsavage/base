const webpack = require('webpack');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  compress: false, // gzip compression should be the task of proxies
  reactStrictMode: true,
  webpack: (config) => {
    if (config.mode === 'production') {
      // production specific configs
    }
    return config;
  },
  async redirects(){
    return [
      {
        source: "/",
        destination: "/create",
        permanent: false
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/(.*)',
        destination: '/'
      }
    ]
  }
});