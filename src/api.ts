import { movieTypes } from "./utils";

export const API_KEY = `cd1301271b0bed0fd9bf1be0caaa26cd`;
export const BASE_PATH = `https://api.themoviedb.org/3`;

export interface IMovie {
	adult: boolean;
	backdrop_path: string;
	genre_ids: object;
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface IGetMovies {
	dates: {
		maximum: string;
		minimum: string;
	};
	results: IMovie[];
}

export function getMovies(type: movieTypes) {
	return fetch(
		`${BASE_PATH}/movie/${type}?api_key=${API_KEY}&language=ko-KR&page=1`
	).then((response) => response.json());
}
