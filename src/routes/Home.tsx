import { useQuery } from "@tanstack/react-query";
import { IGetMovies, getMovies } from "../api";

function Home() {
	const { data, isLoading } = useQuery<IGetMovies>(
		["movie", "now_playing"],
		getMovies
	);
	console.log(isLoading, data);
	return <div>{data?.results[0].title}</div>;
}

export default Home;
