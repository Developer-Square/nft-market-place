/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['infura-ipfs.io', 'techive-nft-marketplace-2.infura-ipfs.io'],
	},
};

module.exports = nextConfig;
