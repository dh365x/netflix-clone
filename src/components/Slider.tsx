import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { IGetMovies, getMovies } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Wrapper = styled.div`
	position: relative;
	top: -240px;
	height: 240px;
	&:hover {
		button {
			opacity: 1;
			transition: 1s ease;
		}
	}
`;

const Title = styled.h2`
	padding: 20px 60px 15px 60px;
	font-size: 22px;
	color: ${(props) => props.theme.white.normal};
`;

const Row = styled(motion.div)`
	position: absolute;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	width: 100%;
	gap: 5px;
	padding: 0 60px;
`;

const Box = styled(motion.div)<{ $bgImage: string }>`
	height: 150px;
	background-color: rgba(155, 251, 240, 0.5);
	background-image: url(${(props) => props.$bgImage});
	background-position: center center;
	background-size: cover;
	&:first-child {
		transform-origin: center left;
	}
	&:last-child {
		transform-origin: center right;
	}
`;

const Info = styled(motion.div)`
	position: absolute;
	width: 100%;
	bottom: 0;
	padding: 10px;
	background-color: ${(props) => props.theme.black.normal};
	opacity: 0;
	h3 {
		text-align: center;
		font-size: 16px;
	}
`;

const Button = styled.button<{ isRight: boolean }>`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 55px;
	height: 150px;
	right: ${(props) => (props.isRight ? 0 : null)};
	rotate: ${(props) => (props.isRight ? "180deg" : null)};
	background-color: rgba(20, 20, 20, 0.7);
	opacity: 0;
	svg {
		fill: #fff;
	}
`;

const rowVariants = {
	hidden: (isPrev: boolean) => {
		return {
			x: isPrev ? -window.outerWidth : window.outerWidth,
		};
	},
	visible: { x: 0 },
	exit: (isPrev: boolean) => {
		return {
			x: isPrev ? window.outerWidth : -window.outerWidth,
		};
	},
};

const boxVariants = {
	normal: { scale: 1 },
	hover: {
		y: -50,
		scale: 1.3,
		transition: {
			delay: 0.4,
			duration: 0.3,
			type: "tween",
		},
	},
};

const infoVariants = {
	hover: {
		opacity: 1,
		transition: {
			delay: 0.4,
			duration: 0.3,
			type: "tween",
		},
	},
};

const offset = 6;

function Slider() {
	const { data } = useQuery<IGetMovies>(["movie", "now_playing"], getMovies);

	const [index, setIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const [isPrev, setIsPrev] = useState(false);

	const toggleLeaving = () => {
		setLeaving((prev) => !prev);
	};
	const decreaseIndex = () => {
		if (data) {
			if (leaving) return;
			toggleLeaving();
			const totalMovie = data.results.length - 3;
			const maxIndex = Math.floor(totalMovie / offset);
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
			setIsPrev(true);
		}
	};
	const increaseIndex = () => {
		if (data) {
			if (leaving) return;
			toggleLeaving();
			const totalMovie = data.results.length - 3;
			const maxIndex = Math.floor(totalMovie / offset);
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
			setIsPrev(false);
		}
	};

	return (
		<Wrapper>
			<Title>지금 상영중</Title>
			<AnimatePresence
				custom={isPrev}
				initial={false}
				onExitComplete={toggleLeaving}
			>
				<Row
					key={index}
					custom={isPrev}
					variants={rowVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					transition={{ type: "tween", duration: 0.7 }}
				>
					{data?.results
						.slice(2)
						.slice(offset * index, offset * index + offset)
						.map((movie) => (
							<Box
								variants={boxVariants}
								initial="normal"
								whileHover="hover"
								key={movie.id}
								$bgImage={makeImagePath(movie.backdrop_path, "w500")}
							>
								<Info variants={infoVariants}>
									<h3>{movie.title}</h3>
								</Info>
							</Box>
						))}
				</Row>
			</AnimatePresence>
			<Button onClick={decreaseIndex} isRight={false}>
				<svg viewBox="0 0 1024 1024">
					<path d="M604.7 759.2l61.8-61.8L481.1 512l185.4-185.4-61.8-61.8L357.5 512z" />
				</svg>
			</Button>
			<Button onClick={increaseIndex} isRight={true}>
				<svg viewBox="0 0 1024 1024">
					<path d="M604.7 759.2l61.8-61.8L481.1 512l185.4-185.4-61.8-61.8L357.5 512z" />
				</svg>
			</Button>
		</Wrapper>
	);
}

export default Slider;
