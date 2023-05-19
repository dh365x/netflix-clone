import { useQuery } from "@tanstack/react-query";
import { IGetTv, getTv, tvTypes } from "../../api/tv";
import styled from "styled-components";
import { makeImagePath } from "../../utils";

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

const Row = styled.div`
	position: absolute;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	width: 100%;
	gap: 5px;
	padding: 0 60px;
`;

const Box = styled.div<{ $bgImage: string }>`
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

function Slider({ type, pageNum }: { type: tvTypes; pageNum: number }) {
	const { data } = useQuery<IGetTv>([`tv`, `tv_${type}`], () =>
		getTv(type, pageNum)
	);

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
				<Row>
					{data?.results
						.slice(2)
						.slice(0, 6)
						.map((content) => (
							<Box
								$bgImage={makeImagePath(
									content.backdrop_path || content.poster_path,
									"w500"
								)}
							>
								<Info>
									<h3>{content.name}</h3>
								</Info>
							</Box>
						))}
				</Row>
			</RowContainer>
		</>
	);
}

export default Slider;
