import { API_KEY, BASE_PATH } from "../api";

export enum tvTypes {
	popular = "popular",
	top_rated = "top_rated",
	on_the_air = "on_the_air",
	airing_today = "airing_today",
}

export interface IGetTv {
	results: ITv[];
}
export interface ITv {
	id: number;
	name: string;
	overview: string;
	genre_ids: Number[];
	poster_path: string;
	backdrop_path: string;
	first_air_date: string;
	popularity: number;
	vote_count: number;
	vote_average: number;
	original_name: string;
}

export interface IGetTvDetails {
	id: number;
	name: string;
	genres: [
		{
			id: number;
			name: string;
		}
	];
	overview: string;
	poster_path: string;
	backdrop_path: string;
	first_air_date: string;
	last_air_date: string;
	last_episode_to_air: object;
	number_of_episodes: number;
	number_of_seasons: number;
	original_name: string;
	vote_average: number;
	popularity: number;
	networds: [
		{
			id: number;
			name: string;
		}
	];
	seasons: object;
	status: string;
	tagline: string;
	type: string;
}

export interface IGetTvRatings {
	id: number;
	results: ITvRatings[];
}
export interface ITvRatings {
	iso_3166_1: string;
	rating: string;
}

export interface IGetTvCredits {
	id: number;
	cast: ICast[];
	crew: ICrew[];
}
export interface ICast {
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
export interface ICrew {
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

export interface IGetTvRecommend {
	results: ITvRecommend[];
}
export interface ITvRecommend {
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

export function getTv(type: tvTypes, pageNum: number) {
	return fetch(
		`${BASE_PATH}/tv/${type}?api_key=${API_KEY}&language=ko-KR&page=${pageNum}`
	).then((response) => response.json());
}

export function getTvDetails(id: string) {
	return fetch(`${BASE_PATH}/tv/${id}?api_key=${API_KEY}&language=ko-KR`).then(
		(response) => response.json()
	);
}

export function getTvRatings(id: string) {
	return fetch(`${BASE_PATH}/tv/${id}/content_ratings?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getTvCredits(id: string) {
	return fetch(
		`${BASE_PATH}/tv/${id}/credits?api_key=${API_KEY}&language=ko-KR`
	).then((response) => response.json());
}

export function getTvRecommend(id: string) {
	return fetch(
		`${BASE_PATH}/tv/${id}/recommendations?api_key=${API_KEY}&language=ko-KR&page=1`
	).then((response) => response.json());
}
