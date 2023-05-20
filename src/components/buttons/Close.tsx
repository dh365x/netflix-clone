import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.button`
	position: absolute;
	display: flex;
	justify-content: center;
	top: 15px;
	right: 15px;
	width: 17px;
	height: 17px;
	padding: 10px;
	border-radius: 50%;
	border: 2px solid transparent;
	background-color: ${(props) => props.theme.black.darker};
	&:hover {
		border: 2px solid ${(props) => props.theme.white.darker};
		transition: 0.5s;
	}
	&:active {
		border: 2px solid white;
	}
`;

function Close() {
	const history = useHistory();
	const onCloseClick = () => {
		history.goBack();
	};

	return (
		<Wrapper onClick={onCloseClick}>
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path
					fill="currentColor"
					d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z"
				></path>
			</svg>
		</Wrapper>
	);
}

export default Close;
