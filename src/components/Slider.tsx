import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { IGetMovies, getMovies } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
	position: relative;
	top: -240px;
	height: 240px;
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

const Box = styled.div<{ bgImage: string }>`
	height: 150px;
	background-color: rgba(155, 251, 240, 0.5);
	background-image: url(${(props) => props.bgImage});
	background-position: center center;
	background-size: cover;
`;

const Button = styled.button<{ isRight: boolean }>`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 55px;
	height: 150px;
	right: ${(props) => (props.isRight ? 0 : null)};
	rotate: ${(props) => (props.isRight ? "180deg" : null)};
	background-color: rgba(20, 20, 20, 0.7);
	svg {
		fill: #fff;
	}
`;

function Slider() {
	const { data } = useQuery<IGetMovies>(["movie", "now_playing"], getMovies);

	return (
		<Wrapper>
			<Title>지금 상영중</Title>
			<Row>
				{data?.results.map((movie) => (
					<Box
						key={movie.id}
						bgImage={makeImagePath(movie.backdrop_path, "w500")}
					/>
				))}
			</Row>
			<Button isRight={true}>
				<svg viewBox="0 0 1024 1024">
					<path d="M604.7 759.2l61.8-61.8L481.1 512l185.4-185.4-61.8-61.8L357.5 512z" />
				</svg>
			</Button>
			<Button isRight={false}>
				<svg viewBox="0 0 1024 1024">
					<path d="M604.7 759.2l61.8-61.8L481.1 512l185.4-185.4-61.8-61.8L357.5 512z" />
				</svg>
			</Button>
		</Wrapper>
	);
}

export default Slider;
