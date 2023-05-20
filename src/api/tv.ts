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

export function getTv(type: tvTypes, pageNum: number) {
	return fetch(
		`${BASE_PATH}/tv/${type}?api_key=${API_KEY}&language=ko-KR&page=${pageNum}`
	).then((response) => response.json());
}
