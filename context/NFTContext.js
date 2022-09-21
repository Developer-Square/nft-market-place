import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";

import { MarketAddress, MarketAddressABI } from "./constants";
import validateEnv from "../utils/validateEnv";
const ipfsClient = require("ipfs-http-client");

export const NFTContext = React.createContext();

const projectId = validateEnv(
	"IPFS Project Id",
	process.env.NEXT_PUBLIC_IPFS_PROJECT_ID
);
const projectSecret = validateEnv(
	"IPFS Project API secret key",
	process.env.NEXT_PUBLIC_IPFS_API_KEY
);
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
	"base64"
)}`;
console.log({ auth });

const ipfs = ipfsClient.create({
	host: "ipfs.infura.io",
	port: 5001,
	protocol: "https",
	headers: {
		authorization: auth,
	},
});

export const NFTProvider = ({ children }) => {
	const [currentAccount, setCurrentAccount] = useState("");
	const nftCurrency = "Matic";

	const checkIfWalletIsConnected = async () => {
		if (!window.ethereum) return alert("Please install Metamask");

		const accounts = await window.ethereum.request({ method: "eth_accounts" });

		if (accounts.length) {
			setCurrentAccount(accounts[0]);
		} else {
			console.log("No accounts found");
		}
	};

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	const connectWallet = async () => {
		if (!window.ethereum) return alert("Please install Metamask");

		const accounts = await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		setCurrentAccount(accounts[0]);

		window.location.reload();
	};

	const uploadToIPFS = async (file) => {
		try {
			const added = await ipfs.add({ content: file });
			console.log({ added });

			const url = `https://infura-ipfs.io/ipfs/${added.path}`;

			return url;
		} catch (error) {
			console.log("Error uploading file to IPFS", error);
		}
	};

	return (
		<NFTContext.Provider
			value={{ nftCurrency, connectWallet, currentAccount, uploadToIPFS }}
		>
			{children}
		</NFTContext.Provider>
	);
};
