import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearch } from "../api";
import { makeImagePath } from "../utils";
import { motion } from "framer-motion";

const Loader = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 20vh;
`;

const Row = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 5px;
	width: 100%;
	padding: 0 60px;
	margin-top: 190px;
`;

const Box = styled(motion.div)<{ $bgImage: string }>`
	height: 150px;
	background-color: ${(props) => props.theme.black.darker};
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

interface IGetSearch {
	results: ISearch[];
}

function Search() {
	const location = useLocation();
	const keyword = new URLSearchParams(location.search).get("keyword");

	const { data, isLoading } = useQuery<IGetSearch>(["search"], () =>
		getSearch(String(keyword))
	);

	return (
		<div>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<Row>
					{data?.results.slice(0, -2).map((content) => (
						<Box
							key={content.id}
							variants={boxVariants}
							initial="normal"
							whileHover="hover"
							$bgImage={makeImagePath(
								content.backdrop_path || content.poster_path,
								"w500"
							)}
						>
							{content.backdrop_path || content.poster_path ? null : (
								<Replace>{content.title || content.name}</Replace>
							)}
							<Info variants={infoVariants}>
								<h3>{content.title ? content.title : content.name}</h3>
							</Info>
						</Box>
					))}
				</Row>
			)}
		</div>
	);
}

export default Search;
