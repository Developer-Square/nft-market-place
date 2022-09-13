import { ThemeProvider } from "next-themes";
import { Footer, Navbar } from "../components";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
	return (
		<ThemeProvider attribute='class'>
			<div className='dark:bg-nft-dark bg-white min-h-screen'></div>
			<Navbar />
			<Component {...pageProps} />
			<Footer />
		</ThemeProvider>
	);
};

export default MyApp;
