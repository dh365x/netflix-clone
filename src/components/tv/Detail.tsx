import styled from "styled-components";
import {
	IGetTvCredits,
	IGetTvDetails,
	IGetTvRatings,
	IGetTvRecommend,
	getTvCredits,
	getTvDetails,
	getTvRatings,
	getTvRecommend,
	tvTypes,
} from "../../api/tv";
import { useQuery } from "@tanstack/react-query";
import { makeImagePath } from "../../utils";
import Close from "../buttons/Close";
import Play from "../buttons/Play";
import Tags from "../buttons/Tags";
import { SvgR15, SvgR18, SvgRAll } from "../../assets/SvgRating";

const Wrapper = styled.div`
	background-color: ${(props) => props.theme.black.darker};
	border-radius: 6px;
	padding-bottom: 30px;
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
	justify-content: space-between;
`;

const Details = styled.div`
	width: 65%;
	div {
		span {
			margin-right: 10px;
			&:first-child {
				color: #46d369;
				font-weight: 500;
			}
		}
		div {
			display: flex;
			align-items: center;
			margin-top: 10px;
		}
		svg {
			width: 25px;
			margin-right: 10px;
		}
	}
	p {
		display: flex;
		margin-top: 20px;
		margin-bottom: 20px;
	}
`;

const Credits = styled.div`
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
	margin-top: 30px;
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
	type: tvTypes;
}

function Detail({ id, type }: IProps) {
	const { data: detailsData } = useQuery<IGetTvDetails>(
		[`tvDetails`, `tvDetails_${type}`],
		() => getTvDetails(id)
	);

	const { data: ratingsData } = useQuery<IGetTvRatings>(
		[`tvRatings`, `tvRatings_${type}`],
		() => getTvRatings(id)
	);

	const { data: creditsData } = useQuery<IGetTvCredits>(
		[`tvCredits`, `tvCredits_${type}`],
		() => getTvCredits(id)
	);

	const { data: recommendData } = useQuery<IGetTvRecommend>(
		[`tvRecommend`, `tvReccomend_${type}`],
		() => getTvRecommend(id)
	);

	const getYear = (date: string) => {
		if (date) return date.split("-")[0];
	};

	const getRating = () => {
		if (ratingsData) {
			const usCode = String(
				ratingsData?.results.find((rating) => rating.iso_3166_1 === "US")
					?.rating
			);
			return usCode;
		}
	};

	console.log(detailsData);

	return (
		<Wrapper>
			{detailsData && (
				<>
					<Cover
						$bgCover={makeImagePath(
							detailsData.backdrop_path || detailsData.poster_path
						)}
					>
						<Title>{detailsData.name}</Title>
						<Close />
						<Buttons>
							<Play />
							<Tags />
						</Buttons>
					</Cover>
					<Container>
						<Info>
							<Details>
								<div>
									<span>{Math.floor(detailsData.vote_average * 10)}% 일치</span>
									<span>{getYear(detailsData.first_air_date)}</span>
									<span>에피소드 {detailsData.number_of_episodes}개</span>
									<div>
										{getRating() === "TV-MA" ? (
											<div>
												<SvgR18 />
												<span>청소년 관람불가</span>
											</div>
										) : getRating() === "TV-14" ? (
											<>
												<SvgR15 />
												<span>15세이상 관람가</span>
											</>
										) : (
											<>
												<SvgRAll />
												<span>전체관람가</span>
											</>
										)}
									</div>
								</div>
								<p>{detailsData.tagline || detailsData.overview}</p>
							</Details>
							<Credits>
								<div>
									<label>감독: </label>
									<span>
										{creditsData?.crew.find(
											(person) => person.known_for_department === "Directing"
										)?.name || "Broadcasting"}
									</span>
								</div>
								<div>
									<label>출연: </label>
									{creditsData?.cast.slice(0, 6).map((actor) => (
										<span key={actor.id}>{actor.name},</span>
									))}
								</div>
								<div>
									<label>장르: </label>
									{detailsData.genres.map((genre) => (
										<span key={genre.id}>{genre.name},</span>
									))}
								</div>
							</Credits>
						</Info>
						<Recommend>
							{recommendData?.results.length === 0 ? null : (
								<>
									<h3>함께 시청한 콘텐츠</h3>
									<List>
										{recommendData?.results.slice(0, 6).map((content) => (
											<Box
												key={content.id}
												$bgPoster={makeImagePath(content.poster_path, "w500")}
											>
												<p>{content.poster_path ? null : content.title}</p>
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
