import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearch } from "../api";
import { makeImagePath } from "../utils";

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

const Box = styled.div<{ $bgImage: string }>`
	height: 150px;
	background-image: url(${(props) => props.$bgImage});
	background-position: center center;
	background-size: cover;
`;

const Info = styled.div``;

interface ISearch {
	adult: boolean;
	backdrop_path: string;
	id: number;
	title: string;
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
							$bgImage={makeImagePath(content.backdrop_path, "w500")}
						>
							<Info>
								<h3>{content.title}</h3>
							</Info>
						</Box>
					))}
				</Row>
			)}
		</div>
	);
}

export default Search;
