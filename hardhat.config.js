// Development Configuration
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

// require('dotenv').config();
// require('@nomiclabs/hardhat-ethers');

// const { NEXT_PUBLIC_ALCHEMY_TEST_URL, NEXT_PUBLIC_WALLET_PRIVATE_KEY } =
// 	process.env;

// module.exports = {
// 	solidity: '0.8.17',
// 	defaultNetwork: 'goerli',
// 	networks: {
// 		hardhat: {},
// 		goerli: {
// 			url: NEXT_PUBLIC_ALCHEMY_TEST_URL,
// 			accounts: [`0x${NEXT_PUBLIC_WALLET_PRIVATE_KEY}`],
// 		},
// 	},
// };

// Production Configuration
require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

module.exports = {
	defaultNetwork: 'matic',
	networks: {
		hardhat: {},
		matic: {
			url: process.env.NEXT_PUBLIC_ALCHEMY_API_URL,
			accounts: [process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY],
		},
	},
	solidity: {
		version: '0.8.17',
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	paths: {
		sources: './contracts',
		tests: './test',
		cache: './cache',
		artifacts: './artifacts',
	},
	mocha: {
		timeout: 20000,
	},
};
