import { useQuery } from "@tanstack/react-query";
import { IGetTv, getTv, tvTypes } from "../../api/tv";
import styled from "styled-components";
import { makeImagePath } from "../../utils";
import { useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";
import Detail from "./Detail";

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

const Info = styled.div`
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

const offset = 6;

function Slider({ type, pageNum }: { type: tvTypes; pageNum: number }) {
	const { data } = useQuery<IGetTv>([`tv`, `tv_${type}`], () =>
		getTv(type, pageNum)
	);

	const [index, setIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const [isPrev, setIsPrev] = useState(false);
	const { scrollY } = useScroll();
	const history = useHistory();
	const modalMatch = useRouteMatch<{ contentId: string }>(
		`/tv/${type}/:contentId`
	);

	const toggleLeaving = () => {
		setLeaving((prev) => !prev);
	};
	const onArrowClick = (prevv: boolean) => {
		if (data) {
			if (leaving) return;
			toggleLeaving();
			const totalContent = data.results.length - 3;
			const maxIndex = Math.floor(totalContent / offset);
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
			setIsPrev(prevv);
		}
	};
	const onBoxClick = (contentId: string) => {
		history.push(`tv/${type}/${contentId}`);
	};
	const onOverlayClick = () => {
		history.goBack();
	};

	return (
		<>
			<RowContainer>
				<Title>
					{type === tvTypes.top_rated
						? "넷플릭스 인기 시리즈"
						: type === tvTypes.popular
						? "몰아보기 추천 시리즈"
						: type === tvTypes.on_the_air
						? "지금 방송 중인 콘텐츠"
						: type === tvTypes.airing_today
						? "오늘의 발견!"
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
							.map((content) => (
								<Box
									key={content.id}
									variants={boxVariants}
									initial="normal"
									whileHover="hover"
									onClick={() => onBoxClick(String(content.id))}
									$bgImage={makeImagePath(
										content.backdrop_path || content.poster_path,
										"w500"
									)}
								>
									<Info>
										<h3>{content.name}</h3>
									</Info>
									<HideBox layoutId={type + content.id} />
								</Box>
							))}
					</Row>
				</AnimatePresence>
				<Button onClick={() => onArrowClick(true)} isRight={false}>
					<svg viewBox="0 0 1024 1024">
						<path d="M604.7 759.2l61.8-61.8L481.1 512l185.4-185.4-61.8-61.8L357.5 512z" />
					</svg>
				</Button>
				<Button onClick={() => onArrowClick(false)} isRight={true}>
					<svg viewBox="0 0 1024 1024">
						<path d="M604.7 759.2l61.8-61.8L481.1 512l185.4-185.4-61.8-61.8L357.5 512z" />
					</svg>
				</Button>
			</RowContainer>
			{modalMatch && (
				<>
					<Overlay
						onClick={onOverlayClick}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					/>
					<ModalBox
						layoutId={type + modalMatch.params.contentId}
						style={{ top: scrollY.get() + 30 }}
					>
						<Detail id={modalMatch.params.contentId} type={type} />
					</ModalBox>
				</>
			)}
		</>
	);
}

export default Slider;
