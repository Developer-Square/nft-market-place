export const makeId = (length) => {
	let result = "";
	const characters = "abcdefghijklmnopqrstuvwxyz1234567890";
	const charactersLength = characters.length;

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
};
