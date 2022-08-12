const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
};

module.exports = nextConfig;
