export const getBestCreators = (nfts) => {
	if (nfts.length) {
		const finalized = [];

		const creators = nfts.reduce((creatorObj, nft) => {
			(creatorObj[nft.seller] = creatorObj[nft.seller] || []).push(nft);

			return creatorObj;
		}, {});

		Object.entries(creators).forEach((creator) => {
			const seller = creator[0];
			const sum = creator[1]
				.map((item) => Number(item.price))
				.reduce((prev, curr) => prev + curr, 0);

			finalized.push({ seller, sum });
		});
		return finalized.sort((a, b) => {
			if (a['sum'] > b['sum']) return -1;
			if (a['sum'] < b['sum']) return 1;
			return 0;
		});
	}
};

// --> Ryan's Solution
// export const getBestCreators = (nfts) => {
// 	if (nfts.length > 0) {
// 		let bestCreators = [];
// 		nfts.map((nft, index) => {
// 			if (bestCreators.length) {
// 				const result = bestCreators.every(
// 					(creator) => creator.seller !== nft.seller
// 				);
// 				if (result) {
// 					bestCreators.push({
// 						seller: nft.seller,
// 						sum: parseInt(nft.price, 10),
// 					});
// 				} else {
// 					const intNFTPrice = parseInt(nft.price, 10);
// 					bestCreators[index - 1]['sum'] += 1;
// 				}
// 			} else {
// 				bestCreators.push({ seller: nft.seller, sum: parseInt(nft.price, 10) });
// 			}
// 		});
// 		bestCreators.sort((a, b) => {
// 			if (a['sum'] > b['sum']) return -1;
// 			if (a['sum'] < b['sum']) return 1;
// 			return 0;
// 		});
// 		console.log(bestCreators);
// 	}
// };
