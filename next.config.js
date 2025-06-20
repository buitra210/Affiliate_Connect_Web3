/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/web3-growth/:id/dapp-snapshot",
        destination: "/web3-growth/:id/dapp-snapshot/overview",
        permanent: true,
      },
      {
        source: "/web3-growth/:id/token-snapshot",
        destination: "/web3-growth/:id/token-snapshot/overview",
        permanent: true,
      },

      {
        source: "/echosystem",
        destination: "http://localhost:3001/portfolio/entities",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "http://localhost:3001/portfolio",
        permanent: true,
      },
      {
        source: "/portfolio/entities",
        destination: "http://localhost:3001/portfolio/entities",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
