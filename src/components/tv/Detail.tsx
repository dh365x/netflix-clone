import styled from "styled-components";
import {
	IGetTvDetails,
	IGetTvRatings,
	getTvDetails,
	getTvRatings,
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
						</Info>
					</Container>
				</>
			)}
		</Wrapper>
	);
}

export default Detail;
