import { useQuery } from "@tanstack/react-query";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getKeyword, getMovieSearch } from "../api";
import { makeImagePath, movieTypes } from "../utils";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import Detail from "../components/Detail";

const Loader = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 20vh;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 150px 60px;
`;

const Keywords = styled.div`
	display: flex;
	margin-bottom: 30px;
	color: #808080;

	ul {
		margin-right: 15px;
		font-size: 15px;
	}
	li {
		color: ${(props) => props.theme.white.normal};
	}
	span:last-child {
		margin: 0 10px;
		color: #808080;
	}
`;

const Row = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 5px;
	width: 100%;
`;

const Box = styled(motion.div)<{ $bgImage: string }>`
	height: 150px;
	margin-bottom: 50px;
	background-image: url(${(props) => props.$bgImage});
	background-position: centert;
	background-size: cover;
	:nth-child(6n + 1) {
		transform-origin: center left;
	}
	:nth-child(6n + 6) {
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

const Replace = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	font-size: 20px;
	background: radial-gradient(
		circle,
		rgba(47, 47, 47, 1) 0%,
		rgb(24, 24, 24, 1) 100%
	);
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

interface IGetSearch {
	results: ISearch[];
}
interface ISearch {
	adult: boolean;
	backdrop_path: string;
	id: number;
	title: string;
	name: string;
	original_language: string;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: string;
	genre_ids: object;
	popularity: number;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}
interface IGetKeyword {
	results: IKeyword[];
}
interface IKeyword {
	id: number;
	name: string;
}
function Search() {
	const location = useLocation();
	const keyword = new URLSearchParams(location.search).get("keyword");

	const { data, isLoading } = useQuery<IGetSearch>(["search"], () =>
		getMovieSearch(String(keyword))
	);
	const { data: keywordData } = useQuery<IGetKeyword>(["keywords"], () =>
		getKeyword(String(keyword))
	);

	const { scrollY } = useScroll();
	const history = useHistory();
	const searchMatch = useRouteMatch<{ id: string }>(`/search/:id`);

	const onBoxClick = (contentId: number) => {
		history.push(`/search/${contentId}`);
	};
	const onOverlayClick = () => {
		history.goBack();
	};

	return (
		<div>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<Container>
					<Keywords>
						<ul>다음과 관련된 콘텐츠:</ul>
						{keywordData?.results
							.map((key) => (
								<li key={key.id}>
									<span>{key.name}</span>
									<span style={{ padding: "0 10px" }}>|</span>
								</li>
							))
							.slice(0, 5)}
					</Keywords>
					<Row>
						{data?.results.slice(0, -2).map((content) => (
							<Box
								key={content.id}
								onClick={() => onBoxClick(content.id)}
								$bgImage={makeImagePath(
									content.backdrop_path || content.poster_path,
									"w500"
								)}
								layoutId={content.id + ""}
								variants={boxVariants}
								initial="normal"
								whileHover="hover"
							>
								{content.backdrop_path || content.poster_path ? null : (
									<Replace>{content.title || content.name}</Replace>
								)}
								<Info variants={infoVariants}>
									<h3>
										{content.title || content.original_title || content.name}
									</h3>
								</Info>
							</Box>
						))}
					</Row>
					<AnimatePresence>
						{searchMatch && (
							<>
								<Overlay
									onClick={onOverlayClick}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								/>
								<ModalBox
									layoutId={searchMatch.params.id}
									style={{ top: scrollY.get() + 30 }}
								>
									<Detail id={searchMatch.params.id} type={movieTypes.search} />
								</ModalBox>
							</>
						)}
					</AnimatePresence>
				</Container>
			)}
		</div>
	);
}

export default Search;
