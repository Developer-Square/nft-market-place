/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */

// eslint-disable-next-line no-unused-vars
const privateKey = fs.readFileSync('.secret').toString().trim();

module.exports = {
	networks: {
		hardhat: {
			chainId: 1337,
		},
	},
	solidity: '0.8.17',
};
