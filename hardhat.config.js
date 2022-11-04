/* eslint-disable import/no-extraneous-dependencies */
// const fs = require('fs');
// require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */

// eslint-disable-next-line no-unused-vars
// const privateKey = fs.readFileSync('.secret').toString().trim();

// module.exports = {
// 	networks: {
// 		hardhat: {
// 			chainId: 1337,
// 		},
// 	},
// 	solidity: '0.8.17',
// };

// Production Configuration
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
