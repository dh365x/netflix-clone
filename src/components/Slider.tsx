import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { IGetMovies, getMovies } from "../api";
import { makeImagePath, movieTypes } from "../utils";
import { useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";
import Detail from "./Detail";

const Wrapper = styled.div``;

const RowContainer = styled.div`
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

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	z-index: 11;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
`;

const ModalBox = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 11;
	margin: 0 auto;
	width: 55vw;
	height: 100%;
	border-radius: 10px;
	box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;
	background-color: ${(props) => props.theme.black.darker};
`;

const HideBox = styled(motion.div)`
	width: 100%;
	height: 100%;
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

function Slider({ type }: { type: movieTypes }) {
	const { data } = useQuery<IGetMovies>(["movie", type], () => getMovies(type));

	const [index, setIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const [isPrev, setIsPrev] = useState(false);

	const { scrollY } = useScroll();
	const history = useHistory();
	const modalMatch = useRouteMatch<{ movieId: string }>(
		`/movie/${type}/:movieId`
	);

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

	const onBoxClick = (movieId: number) => {
		history.push(`/movie/${type}/${movieId}`);
	};
	const onOverlayClick = () => {
		history.goBack();
	};

	return (
		<Wrapper>
			<RowContainer>
				<Title>
					{type === movieTypes.now_playing
						? "지금 뜨는 콘텐츠"
						: type === movieTypes.popular
						? "넷플릭스 인기 콘텐츠"
						: type === movieTypes.top_rated
						? "오늘 대한민국의 TOP 10"
						: type === movieTypes.upcoming
						? "이번 주 공개 콘텐츠"
						: type}
				</Title>

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
									onClick={() => onBoxClick(movie.id)}
									variants={boxVariants}
									initial="normal"
									whileHover="hover"
									key={movie.id}
									$bgImage={makeImagePath(movie.backdrop_path, "w500")}
								>
									<Info variants={infoVariants}>
										<h3>{movie.title}</h3>
									</Info>
									<HideBox layoutId={type + movie.id}></HideBox>
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
			</RowContainer>
			<AnimatePresence>
				{modalMatch && (
					<>
						<Overlay
							onClick={onOverlayClick}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						/>
						<ModalBox
							layoutId={type + modalMatch.params.movieId}
							style={{ top: scrollY.get() + 30 }}
						>
							<Detail id={modalMatch.params.movieId} type={type} />
						</ModalBox>
					</>
				)}
			</AnimatePresence>
		</Wrapper>
	);
}

export default Slider;
