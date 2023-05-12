import styled from "styled-components";
import { makeImagePath, movieTypes } from "../utils";
import { useQuery } from "@tanstack/react-query";
import {
	IGetMovieCredit,
	IGetMovieDetail,
	IGetMovieRecommend,
	getMovieCredits,
	getMovieDetail,
	getMovieRecommend,
} from "../api";
import Close from "./buttons/Close";
import Play from "./buttons/Play";
import Tags from "./buttons/Tags";

const Wrapper = styled.div`
	background-color: ${(props) => props.theme.black.darker};
	padding-bottom: 10px;
`;

const Cover = styled.div<{ $bgCover: string }>`
	position: relative;
	height: 520px;
	border-radius: 6px 6px 0 0;
	background-size: cover;
	background-position: center center;
	background-image: linear-gradient(0deg, #181818, transparent 50%),
		url(${(props) => props.$bgCover});
`;

const Title = styled.h3`
	position: absolute;
	display: flex;
	margin-left: 48px;
	bottom: 140px;
	font-size: 46px;
`;

const Buttons = styled.div`
	position: absolute;
	display: flex;
	margin-left: 48px;
	align-items: center;
	bottom: 60px;
	button {
		margin-right: 10px;
	}
`;

const Container = styled.div`
	padding: 10px 48px;
	background-color: ${(props) => props.theme.black.darker};
	font-weight: 300;
`;

const Info = styled.div`
	display: flex;
	height: 160px;
`;

const DetailInfo = styled.div`
	width: 70%;
	span {
		margin-right: 10px;
		&:first-child {
			color: #46d369;
			font-weight: 500;
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

const Recommend = styled.div`
	h3 {
		font-size: 24px;
		font-weight: 500;
		margin-bottom: 20px;
	}
`;

const List = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20px;
`;

const Box = styled.div<{ $bgPoster: string }>`
	height: 380px;
	border-radius: 6px;
	background-color: ${(props) => props.theme.black.lighter};
	background-size: cover;
	background-position: cneter center;
	background-image: url(${(props) => props.$bgPoster});
	p {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		font-size: 20px;
		font-weight: 500;
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
	const { data: recomendData } = useQuery<IGetMovieRecommend>(
		[`movieRecommend`, `movieRecommend_${type}`],
		() => getMovieRecommend(id)
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
					<Container>
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
						<Recommend>
							{recomendData?.results.length === 0 ? null : (
								<>
									<h3>함께 시청한 콘텐츠</h3>
									<List>
										{recomendData?.results.slice(0, 6).map((video) => (
											<Box
												$bgPoster={makeImagePath(video.poster_path, "w500")}
												key={video.id}
											>
												<p>{video.poster_path ? null : video.title}</p>
											</Box>
										))}
									</List>
								</>
							)}
						</Recommend>
					</Container>
				</>
			)}
		</Wrapper>
	);
}

export default Detail;
