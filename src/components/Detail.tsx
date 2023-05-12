import styled from "styled-components";
import { makeImagePath, movieTypes } from "../utils";
import { useQuery } from "@tanstack/react-query";
import {
	IGetMovieCredit,
	IGetMovieDetail,
	getMovieCredits,
	getMovieDetail,
} from "../api";
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

const Info = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 30px 50px;
	font-weight: 300;
`;

const DetailInfo = styled.div`
	width: 70%;
	span {
		margin-right: 10px;
		&:first-child {
			color: #46d369;
		}
		&:last-child {
			display: flex;
			margin-top: 30px;
		}
	}
`;

const CreditsInfo = styled.div`
	width: 30%;
	font-size: 14px;
	div {
		margin-bottom: 15px;
	}
	label {
		color: #777;
	}
	span {
		margin-right: 5px;
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
	const { data: creditsData } = useQuery<IGetMovieCredit>(
		[`movieCredist`, `movieCredits_${type}`],
		() => getMovieCredits(id)
	);

	const getYear = (date: string) => {
		if (date) return date.split("-")[0];
	};
	const getRuntime = (runTime: number) => {
		if (runTime) {
			const time = Math.floor(runTime / 60);
			const min = Math.floor(runTime % 60);
			return `${time}시간 ${min}분`;
		}
	};

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
					<Info>
						<DetailInfo>
							<span>{Math.floor(detailData.vote_average * 10)}% 일치</span>
							<span>{getYear(detailData.release_date)}</span>
							<span>{getRuntime(detailData.runtime)}</span>
							<span>{detailData.tagline}</span>
						</DetailInfo>
						<CreditsInfo>
							<div>
								<label>출연: </label>
								{creditsData?.cast.slice(0, 2).map((actor) => (
									<span key={actor.cast_id}>{actor.name}, </span>
								))}
							</div>
							<div>
								<label>장르: </label>
								{detailData.genres.map((genre) => (
									<span key={genre.id}>{genre.name}, </span>
								))}
							</div>
						</CreditsInfo>
					</Info>
				</>
			)}
		</Wrapper>
	);
}

export default Detail;
