import React from 'react';
import Button from '../common/Button';

const CustomFooter = ({ handleClose }) => {
	return (
		<div className='flex flex-row sm:flex-col'>
			<Button
				btnName='Checkout'
				classStyles='mr-5 sm:mb-5 sm:mr-0 rounded-xl'
				handleClick={() => {}}
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
