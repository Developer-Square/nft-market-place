import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

import { makeId } from "../../utils/makeId";
import CreatorCard from "./CreatorCard";
import images from "../../assets";

const TopSellers = () => {
	const parentRef = useRef(null);
	const scrollRef = useRef(null);
	const { theme } = useTheme();
	const [hideButtons, setHideButtons] = useState(false);

	const handleScroll = (direction) => {
		const { current } = scrollRef;
		const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

		if (direction === "left") {
			current.scrollLeft -= scrollAmount;
		} else {
			current.scrollLeft += scrollAmount;
		}
	};

	const isScrollable = () => {
		const { current } = scrollRef;
		const { current: parent } = parentRef;

		if (current?.scrollWidth >= parent?.offsetWidth) {
			setHideButtons(false);
		} else {
			setHideButtons(true);
		}
	};

	useEffect(() => {
		isScrollable();
		window.addEventListener("resize", isScrollable);

		return () => {
			window.removeEventListener("resize", isScrollable);
		};
	});
	return (
		<div>
			<h1 className='main-title'>Top Sellers</h1>
			<div className='relative flex-1 max-w-full flex mt-3' ref={parentRef}>
				<div
					className='flex flex-row w-max overflow-x-scroll no-scrollbar select-none'
					ref={scrollRef}
				>
					{[6, 7, 8, 9, 10].map((i) => (
						<CreatorCard
							key={`creator-${i}`}
							rank={i}
							creatorImage={images[`creator${i}`]}
							creatorName={`0x${makeId(3)}...${makeId(4)}`}
							creatorEths={10 - i * 0.5}
						/>
					))}
					{!hideButtons && (
						<>
							<div
								onClick={() => handleScroll("left")}
								className='absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0'
							>
								<Image
									src={images.left}
									layout='fill'
									objectFit='contain'
									alt='left_arrow'
									className={theme === "light" && "fitler invert"}
								/>
							</div>
							<div
								onClick={() => handleScroll("right")}
								className='absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0'
							>
								<Image
									src={images.right}
									layout='fill'
									objectFit='contain'
									alt='right_arrow'
									className={theme === "light" && "fitler invert"}
								/>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default TopSellers;
