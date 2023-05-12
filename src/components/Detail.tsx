import styled from "styled-components";
import { makeImagePath, movieTypes } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { IGetMovieDetail, getMovieDetail } from "../api";
import Play from "./buttons/Play";
import Tags from "./buttons/Tags";
import Close from "./buttons/Close";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;

const Cover = styled.div<{ $bgCover: string }>`
	position: relative;
	display: flex;
	width: 100%;
	height: 60%;
	padding-left: 50px;
	border-radius: 6px;
	background-size: cover;
	background-position: cneter center;
	background-image: linear-gradient(0deg, #181818, transparent 50%),
		url(${(props) => props.$bgCover});
`;

const Title = styled.h3`
	position: absolute;
	display: flex;
	bottom: 130px;
	font-size: 46px;
`;

const Buttons = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	bottom: 50px;
	button {
		margin-right: 10px;
	}
`;

interface IProps {
	id: string;
	type: movieTypes;
}

function Detail({ id, type }: IProps) {
	const { data: detailData } = useQuery<IGetMovieDetail>(
		[`movieDetail`, `movieDetail_${type}`],
		() => getMovieDetail(id)
	);

	return (
		<Wrapper>
			{detailData && (
				<>
					<Cover $bgCover={makeImagePath(detailData.backdrop_path)}>
						<Title>{detailData.title}</Title>
						<Close />
						<Buttons>
							<Play />
							<Tags />
						</Buttons>
					</Cover>
				</>
			)}
		</Wrapper>
	);
}

export default Detail;
