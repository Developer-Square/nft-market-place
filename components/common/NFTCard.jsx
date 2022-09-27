import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import images from '../../assets';
import { NFTContext } from '../../context/NFTContext';
import { shortenAddress } from '../../utils/shortenAddress';

const NFTCard = ({ nft, onProfilePage }) => {
	const { nftCurrency } = useContext(NFTContext);
	return (
		<Link href={{ pathname: '/nft-details', query: nft }}>
			<div className='flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md'>
				<div className='relative w-full h-52 sm:h-36 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden'>
					<Image
						src={nft.image || images[`nft${nft.i}`]}
						layout='fill'
						objectFit='cover'
						alt={`nft${nft.i}`}
					/>
				</div>
				<div className='mt-3 flex flex-col'>
					<p className='nft-card-text text-sm minlg:text-xl'>{nft.name}</p>
				</div>
				<div className='flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3'>
					<p className='nft-card-text'>
						{nft.price} <span className='font-normal'>{nftCurrency}</span>
					</p>
					<p className='nft-card-text'>
						{nft.seller.length > 10
							? shortenAddress(onProfilePage ? nft.owner : nft.seller)
							: nft.seller}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default NFTCard;
