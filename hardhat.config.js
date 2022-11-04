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
			url: 'https://polygon-mainnet.g.alchemy.com/v2/QZqTLJ1MxHT6uTnKUHYMBNkjDefnIZVl',
			accounts: [
				'611c70f12fa1cb92b65b86cc01ed9f09a6458b4e2ebdd8ea00466f67473037a0',
			],
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
