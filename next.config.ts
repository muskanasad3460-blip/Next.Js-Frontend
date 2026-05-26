const nextConfig = {
  images: {
    domains: ["i.pravatar.cc"],
    remotePatterns: [
      // LOCAL BACKEND IMAGES
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },

      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000",
        pathname: "/uploads/**",
      },

      // UNSPLASH IMAGES
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    dangerouslyAllowLocalIP: true,
  },
};

module.exports = nextConfig;
