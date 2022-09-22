/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';

import { MarketAddress, MarketAddressABI } from './constants';
import validateEnv from '../utils/validateEnv';

const ipfsClient = require('ipfs-http-client');

const fetchContract = (signerOrProvider) =>
	new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

export const NFTContext = React.createContext();

const subdomain = validateEnv(
	'IPFS Project Subdomain',
	process.env.NEXT_PUBLIC_IPFS_SUBDOMAIN
);
const projectId = validateEnv(
	'IPFS Project Id',
	process.env.NEXT_PUBLIC_IPFS_PROJECT_ID
);
const projectSecret = validateEnv(
	'IPFS Project API secret key',
	process.env.NEXT_PUBLIC_IPFS_API_KEY
);
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
	'base64'
)}`;

const ipfs = ipfsClient.create({
	host: 'ipfs.infura.io',
	port: 5001,
	protocol: 'https',
	headers: {
		authorization: auth,
	},
});

export const NFTProvider = ({ children }) => {
	const [currentAccount, setCurrentAccount] = useState('');
	const nftCurrency = 'Matic';

	const checkIfWalletIsConnected = async () => {
		if (!window.ethereum) return alert('Please install Metamask');

		const accounts = await window.ethereum.request({ method: 'eth_accounts' });

		if (accounts.length) {
			setCurrentAccount(accounts[0]);
		} else {
			console.log('No accounts found');
		}
	};

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	const connectWallet = async () => {
		if (!window.ethereum) return alert('Please install Metamask');

		const accounts = await window.ethereum.request({
			method: 'eth_requestAccounts',
		});
		setCurrentAccount(accounts[0]);

		window.location.reload();
	};

	const uploadToIPFS = async (file) => {
		try {
			const added = await ipfs.add({ content: file });
			console.log({ added });

			const url = `https://${subdomain}/ipfs/${added.path}`;

			return url;
		} catch (error) {
			console.log('Error uploading file to IPFS', error);
		}
	};

	const createSale = async (url, formInputPrice, isReselling, id) => {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		const price = ethers.utils.parseUnits(formInputPrice, 'ether');
		const contract = fetchContract(signer);
		const listingPrice = await contract.getListingPrice();

		const transaction = await contract.createToken(url, price, {
			value: listingPrice.toString(),
		});

		await transaction.wait();
	};

	const createNFT = async (formInput, fileUrl, router) => {
		const { name, description, price } = formInput;

		if (!name || !description || !price || !fileUrl) return;
		const data = JSON.stringify({ name, description, image: fileUrl });

		try {
			const added = await ipfs.add(data);
			const url = `https://${subdomain}/ipfs/${added.path}`;

			await createSale(url, price);
			router.push('/');
		} catch (error) {
			console.log('Error uploading file to IPFS', error);
		}
	};

	const fetchNFTs = async () => {
		const provider = new ethers.providers.JsonRpcProvider();
		const contract = fetchContract(provider);

		const data = await contract.fetchMarketItems();

		const items = await Promise.all(
			data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
				const tokenURI = await contract.tokenURI(tokenId);
				const {
					data: { image, name, description },
				} = await axios.get(tokenURI);
				const price = ethers.utils.formatUnits(
					unformattedPrice.toString(),
					'ether'
				);

				return {
					price,
					tokenId: tokenId.toNumber(),
					seller,
					owner,
					image,
					name,
					description,
					tokenURI,
				};
			})
		);
		return items;
	};

	const fetchMyNFTSOrListedNFTS = async (type) => {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		const contract = await fetchContract(signer);

		const data =
			type === 'fetchItemsListed'
				? await contract.fetchItemsListed()
				: await contract.fetchMyNFTs();

		const items = await Promise.all(
			data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
				const tokenURI = await contract.tokenURI(tokenId);
				const {
					data: { image, name, description },
				} = await axios.get(tokenURI);
				const price = ethers.utils.formatUnits(
					unformattedPrice.toString(),
					'ether'
				);

				return {
					price,
					tokenId: tokenId.toNumber(),
					seller,
					owner,
					image,
					name,
					description,
					tokenURI,
				};
			})
		);
		return items;
	};

	return (
		<NFTContext.Provider
			value={{
				nftCurrency,
				connectWallet,
				currentAccount,
				uploadToIPFS,
				createNFT,
				fetchNFTs,
				fetchMyNFTSOrListedNFTS,
			}}
		>
			{children}
		</NFTContext.Provider>
	);
};
