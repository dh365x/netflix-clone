import styled from "styled-components";

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

const Box = styled.div`
	height: 150px;
	background-color: rgba(155, 251, 240, 0.5);
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
	return (
		<Wrapper>
			<Title>지금 상영중</Title>
			<Row>
				{[1, 2, 3, 4, 5, 6].map((i) => (
					<Box key={i}>{i}</Box>
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
