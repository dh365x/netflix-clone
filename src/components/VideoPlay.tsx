import { motion, useScroll } from "framer-motion";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getMovieVideos } from "../api";
import { useQuery } from "@tanstack/react-query";
import ReactPlayer from "react-player";

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	z-index: 11;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.9);
`;

const Container = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 11;
	margin: 0 auto;
	width: 55vw;
	height: 55vh;
	border-radius: 10px;
	box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;
	background-color: ${(props) => props.theme.black.darker};
`;

interface IProps {
	contentId: string;
}
interface IGetMovieVideo {
	results: [
		{
			key: string;
		}
	];
}

function VideoPlay({ contentId }: IProps) {
	const { data } = useQuery<IGetMovieVideo>(
		[`movieVideo`, `movieVideo_${contentId}`],
		() => getMovieVideos(contentId)
	);

	const videoKey = data?.results[0].key;
	const { scrollY } = useScroll();
	const history = useHistory();

	const onOverlayClick = () => {
		history.goBack();
	};

	return (
		<>
			<Overlay
				layout
				onClick={onOverlayClick}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ ease: "easeOut", duration: 0.5 }}
			/>
			<Container
				layout
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ ease: "easeOut", duration: 0.5 }}
				style={{ top: scrollY.get() + 150 }}
			>
				<ReactPlayer
					url={`http://www.youtube.com/watch?v=${videoKey}`}
					width="100%"
					height="100%"
					muted={true}
					playing={true}
				/>
			</Container>
		</>
	);
}

export default VideoPlay;
