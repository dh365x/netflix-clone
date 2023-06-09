import { useQuery } from "@tanstack/react-query";
import { IGetMovies, getMovies } from "../api";
import styled from "styled-components";
import { makeImagePath, movieTypes } from "../utils";
import Slider from "../components/Slider";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import Detail from "../components/Detail";
import VideoPlay from "../components/VideoPlay";

const Loader = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 20vh;
`;

const Banner = styled.div<{ bgImage: string }>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100vh;
	padding: 60px;
	background-size: cover;
	background-image: linear-gradient(
			180deg,
			rgba(20, 20, 20, 0.5) 0%,
			rgba(0, 0, 0, 0) 30%,
			rgba(20, 20, 20, 1) 95%
		),
		url(${(props) => props.bgImage});
`;

const Title = styled.h2`
	font-size: 60px;
	margin-bottom: 20px;
	text-shadow: 2px 2px 4px rgb(0 0 0 / 45%);
`;

const Overview = styled.p`
	width: 40%;
	margin-bottom: 20px;
	font-size: 20px;
	font-weight: 300;
	line-height: 1.4;
	text-shadow: 2px 2px 4px rgb(0 0 0 / 45%);
`;

const Buttons = styled.div`
	display: flex;
	svg {
		width: 30px;
		margin-right: 10px;
	}
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
		border-radius: 4px;
		font-size: 20px;
	}
	button:first-child {
		width: 130px;
		margin-right: 10px;
		background-color: rgba(255, 255, 255, 0.9);
		color: ${(props) => props.theme.black.darker};
		:hover {
			background-color: rgba(255, 255, 255, 0.7);
		}
	}
	button:last-child {
		width: 170px;
		background-color: rgba(109, 109, 110, 0.8);
		color: ${(props) => props.theme.white.lighter};
		:hover {
			background-color: rgba(109, 109, 110, 0.5);
		}
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

function Home() {
	const { data, isLoading } = useQuery<IGetMovies>(
		["home", movieTypes.now_playing],
		() => getMovies(movieTypes.now_playing)
	);

	useEffect(() => {
		setRandom(Math.floor(Math.random() * Number(data?.results.length)));
	}, [data]);

	const [random, setRandom] = useState(0);
	const bannerData = data?.results[random];

	const { scrollY } = useScroll();
	const history = useHistory();
	const modalMatch = useRouteMatch<{ id: string }>(`/home/:id`);
	const playMatch = useRouteMatch<{ id: string }>(`/play/:id`);

	const onOverlayClick = () => {
		history.goBack();
	};
	const onInfoClick = (id: string) => {
		history.push(`/home/${id}`);
	};
	const onPlayClick = (id: string) => {
		history.push(`/play/${id}`);
	};

	return (
		<>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Banner bgImage={makeImagePath(bannerData?.backdrop_path || "")}>
						<Title>{bannerData?.title}</Title>
						<Overview>{bannerData?.overview}</Overview>
						<Buttons>
							<button onClick={() => onPlayClick(String(bannerData?.id))}>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
										fill="currentColor"
									/>
								</svg>
								재생
							</button>
							<button onClick={() => onInfoClick(String(bannerData?.id))}>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
										fill="currentColor"
									/>
								</svg>
								상세정보
							</button>
						</Buttons>
					</Banner>

					<Slider type={movieTypes.now_playing} />
					<Slider type={movieTypes.top_rated} />
					<Slider type={movieTypes.upcoming} />
					<Slider type={movieTypes.popular} />

					<AnimatePresence>
						{modalMatch && (
							<>
								<Overlay
									onClick={onOverlayClick}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								/>
								<ModalBox
									style={{ top: scrollY.get() + 30 }}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ ease: "easeOut", duration: 0.5 }}
								>
									<Detail
										id={modalMatch.params.id}
										type={movieTypes.now_playing}
									/>
								</ModalBox>
							</>
						)}
					</AnimatePresence>

					<AnimatePresence>
						{playMatch && <VideoPlay contentId={bannerData?.id + ""} />}
					</AnimatePresence>
				</>
			)}
		</>
	);
}

export default Home;
