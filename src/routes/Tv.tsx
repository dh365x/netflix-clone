import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { IGetTv, getTv, tvTypes } from "../api/tv";
import { makeImagePath } from "../utils";
import { useEffect, useState } from "react";
import Slider from "../components/tv/Slider";
import Play from "../components/buttons/Play";
import Info from "../components/buttons/Info";

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
	div {
		margin-right: 10px;
	}
`;

function Tv() {
	const { data, isLoading } = useQuery<IGetTv>(
		[`main`, `main_${tvTypes.top_rated}`],
		() => getTv(tvTypes.top_rated, 3)
	);

	useEffect(() => {
		setRandom(Math.floor(Math.random() * Number(data?.results.length)));
	}, [data]);

	const [random, setRandom] = useState(0);
	const bannerData = data?.results[random];

	return (
		<>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Banner bgImage={makeImagePath(bannerData?.backdrop_path || "")}>
						<Title>{bannerData?.name || bannerData?.original_name}</Title>
						<Overview>{bannerData?.overview}</Overview>
						<Buttons>
							<Play />
							<Info />
						</Buttons>
					</Banner>
					<Slider type={tvTypes.top_rated} pageNum={1} />
					<Slider type={tvTypes.airing_today} pageNum={4} />
					<Slider type={tvTypes.on_the_air} pageNum={4} />
					<Slider type={tvTypes.popular} pageNum={4} />
				</>
			)}
		</>
	);
}

export default Tv;
