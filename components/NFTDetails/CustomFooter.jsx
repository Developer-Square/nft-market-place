import React, { useContext } from 'react';
import { NFTContext } from '../../context/NFTContext';
import Button from '../common/Button';

const CustomFooter = ({ handleClose, nft, setSuccessModal }) => {
	const { buyNFT } = useContext(NFTContext);

	const checkout = async () => {
		await buyNFT(nft);

		setSuccessModal(true);
		handleClose();
	};
	return (
		<div className='flex flex-row sm:flex-col'>
			<Button
				btnName='Checkout'
				classStyles='mr-5 sm:mb-5 sm:mr-0 rounded-xl'
				handleClick={checkout}
			/>
			<Button
				btnName='Cancel'
				classStyles='mr-5 sm:mr-0 rounded-xl'
				handleClick={handleClose}
			/>
		</div>
	);
};

export default CustomFooter;
