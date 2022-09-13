import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { Footer, Navbar } from "../components";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
	return (
		<ThemeProvider attribute='class'>
			<div className='dark:bg-nft-dark bg-white min-h-screen'>
				<Navbar />
				<Component {...pageProps} />
				<Footer />
			</div>

			<Script
				src='https://kit.fontawesome.com/d45b25ceeb.js'
				crossorigin='anonymous'
			></Script>
		</ThemeProvider>
	);
};

export default MyApp;
