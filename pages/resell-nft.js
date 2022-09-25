import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Banner, Loader, Button } from '../components';
import { NFTContext } from '../context/NFTContext';
import { shortenAddress } from '../utils/shortenAddress';
import Input from '../components/CreateNFT/Input';

const ResellNFT = () => {
	const { createSale } = useContext(NFTContext);
	const router = useRouter();
	const [price, setPrice] = useState('');
	const [image, setImage] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const { tokenId, tokenURI } = router.query;

	const fetchNFT = async () => {
		const { data } = await axios.get(tokenURI);
		setImage(data.image);
		setPrice(data.price);
		setIsLoading(false);
	};

	useEffect(() => {
		if (tokenURI) fetchNFT();
	}, [tokenURI]);

	if (isLoading) {
		return (
			<div className='flexStart min-h-screen'>
				<Loader />
			</div>
		);
	}

	const resell = async () => {
		await createSale(tokenURI, price, true, tokenId);
		router.push('/');
	};

	return (
		<div className='flex justify-center sm:px-4 p-12'>
			<div className='w-3/5 md:w-full'>
				<h1 className='font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl'>
					Resell NFT
				</h1>

				<Input
					inputType='number'
					title='Price'
					placeholder='NFT Price'
					handleClick={(e) => setPrice(e.target.value)}
				/>

				{image ? (
					<img src={image} className='rounded mt-4' width={350} />
				) : null}

				<div className='mt-7 w-full flex justify-end'>
					<Button
						btnName='List NFT'
						classStyles='rounded-xl'
						handleClick={resell}
					/>
				</div>
			</div>
		</div>
	);
};

export default ResellNFT;
