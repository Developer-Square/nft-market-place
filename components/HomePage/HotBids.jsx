import React, { useEffect, useState } from 'react';
import Loader from '../common/Loader';

import NFTCard from '../common/NFTCard';
import SearchBar from '../common/SearchBar';

const HotBids = ({ nfts, setNfts, nftCopy }) => {
	const [activeSelect, setActiveSelect] = useState('Recently Added');

	useEffect(() => {
		const sortedNFTs = [...nfts];

		switch (activeSelect) {
			case 'Recently Added':
				setNfts(sortedNFTs.sort((a, b) => b.tokenId - a.tokenId));
				break;
			case 'Price (low to high)':
				setNfts(sortedNFTs.sort((a, b) => a.price - b.price));
				break;
			case 'Price (high to low)':
				setNfts(sortedNFTs.sort((a, b) => b.price - a.price));
				break;

			default:
				setNfts(nfts);
				break;
		}
	}, [activeSelect]);

	const onHandleSearch = (value) => {
		const filteredNFTs = nfts.filter(({ name }) =>
			name.toLowerCase().includes(value.toLowerCase())
		);

		if (filteredNFTs.length) {
			setNfts(filteredNFTs);
		} else {
			setNfts(nftCopy);
		}
	};

	const onClearSearch = () => {
		if (nfts.length && nftCopy.length) {
			setNfts(nftCopy);
		}
	};
	return (
		<div className='mt-10'>
			<div className='flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start'>
				<h1 className='main-title'>Hot NFTs</h1>
				<div className='flex-2 sm:w-full flex flex-row sm:flex-col'>
					<SearchBar
						activeSelect={activeSelect}
						setActiveSelect={setActiveSelect}
						handleSearch={onHandleSearch}
						clearSearch={onClearSearch}
					/>
				</div>
			</div>
			<div className='mt-3 w-full flex flex-wrap justify-start md:justify-center'>
				{nfts.length ? (
					nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)
				) : (
					<Loader />
				)}
				{/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
				<NFTCard
					key={`NFT-${i}`}
					nft={{
						i,
						name: `Nifty NFT ${i}`,
						price: (10 - i * 0.534).toFixed(2),
						seller: `0x${makeId(3)}...${makeId(4)}`,
						owner: `0x${makeId(3)}...${makeId(4)}`,
						description: 'Coll NFT on Sale',
					}}
				/>
			))} */}
			</div>
		</div>
	);
};

export default HotBids;
