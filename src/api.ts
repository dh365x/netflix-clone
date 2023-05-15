import { movieTypes } from "./utils";

export const API_KEY = `cd1301271b0bed0fd9bf1be0caaa26cd`;
export const BASE_PATH = `https://api.themoviedb.org/3`;

export interface IGetMovies {
	dates: {
		maximum: string;
		minimum: string;
	};
	results: IMovie[];
}
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

export interface IGetMovieDetail {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: object;
	budget: number;
	genres: [{ id: number; name: string }];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: object;
	production_countries: object;
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: [
		{
			iso_639_1: string;
			name: string;
		}
	];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface IGetMovieRating {
	id: number;
	results: IMovieRating[];
}
export interface IMovieRating {
	iso_3166_1: string;
	release_dates: [
		{
			certification: string;
			release_date: string;
			type: number;
		}
	];
}

export interface IGetMovieCredit {
	id: number;
	cast: IMovieCast[];
	crew: IMovieCrew[];
}
export interface IMovieCast {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	cast_id: number;
	character: string;
	credit_id: string;
	orde: number;
}
export interface IMovieCrew {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	credit_id: string;
	department: string;
	job: string;
}

export interface IGetMovieRecommend {
	page: number;
	results: IMovieRecommend[];
	total_pages: number;
	total_results: number;
}
export interface IMovieRecommend {
	adult: boolean;
	backdrop_path: string;
	id: number;
	title: string;
	original_language: string;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: string;
	genre_ids: object;
	popularity: number;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export function getMovies(type: movieTypes) {
	return fetch(
		`${BASE_PATH}/movie/${type}?api_key=${API_KEY}&language=ko-KR&page=1`
	).then((response) => response.json());
}

export function getMovieDetail(id: string) {
	return fetch(
		`${BASE_PATH}/movie/${id}?api_key=${API_KEY}&language=ko-KR`
	).then((response) => response.json());
}

export function getMovieRating(id: string) {
	return fetch(
		`${BASE_PATH}/movie/${id}/release_dates?api_key=${API_KEY}`
	).then((response) => response.json());
}

export function getMovieCredits(id: string) {
	return fetch(
		`${BASE_PATH}/movie/${id}/credits?api_key=${API_KEY}&language=ko-KR`
	).then((response) => response.json());
}

export function getMovieRecommend(id: string) {
	return fetch(
		`${BASE_PATH}/movie/${id}/recommendations?api_key=${API_KEY}&language=ko-KR`
	).then((response) => response.json());
}

export function getSearch(keyword: string) {
	return fetch(
		`${BASE_PATH}/search/multi?api_key=${API_KEY}&language=ko-KR&query=${keyword}&page=1&include_adult=true`
	).then((response) => response.json());
}
