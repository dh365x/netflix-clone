import styled from "styled-components";

const Wrapper = styled.div`
	svg {
		width: 30px;
		margin-right: 10px;
	}
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 130px;
		height: 50px;
		font-size: 20px;
		border-radius: 4px;
		color: ${(props) => props.theme.black.darker};
		background-color: ${(props) => props.theme.white.lighter};
		:hover {
			background-color: ${(props) => props.theme.white.normal};
		}
	}
`;

function Play() {
	return (
		<Wrapper>
			<button>
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
						fill="currentColor"
					/>
				</svg>
				재생
			</button>
		</Wrapper>
	);
}

export default Play;
