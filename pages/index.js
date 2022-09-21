import { useContext, useEffect, useState } from "react";
import { Banner, TopSellers, HotBids } from "../components";
import { NFTContext } from "../context/NFTContext";

const Home = () => {
	const [nfts, setNfts] = useState([]);
	const { fetchNFTs } = useContext(NFTContext);
	useEffect(() => {
		fetchNFTs().then((items) => {
			setNfts(items);
			console.log(items);
		});
	}, []);
	return (
		<div className='flex justify-center sm:px-4 p-12'>
			<div className='w-full minmd:w-4/5'>
				<Banner
					name='Discover, collect, and sell extraordinary NFTs'
					childStyles='md:text-4xl sm:text-2xl xs:text-xl text-left'
					parentStyles='justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl'
				/>
				<TopSellers />
				<HotBids nfts={nfts} />
			</div>
		</div>
	);
};

export default Home;
