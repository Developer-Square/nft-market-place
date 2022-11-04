import React from 'react';
import Image from 'next/image';

import images from '../../assets';

const Loader = () => (
	<div className='flexCenter w-full my-4'>
		<Image src={images.loader2} alt='loader' width={250} objectFit='contain' />
	</div>
);

export default Loader;
