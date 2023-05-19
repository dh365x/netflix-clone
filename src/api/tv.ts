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
	id: "id";
	name: "name";
	overview: "overview";
	genre_ids: "genre_ids";
	vote_count: "vote_count";
	vote_average: "vote_average";
	popularity: "popularity";
	poster_path: "poster_path";
	backdrop_path: "backdrop_path";
	first_air_date: "first_air_date";
	original_name: "original_name";
	origin_country: "origin_country";
	original_language: "original_language";
}

export function getTv(type: tvTypes, pageNum: number) {
	return fetch(
		`${BASE_PATH}/tv/${type}?api_key=${API_KEY}&language=ko-KR&page=${pageNum}`
	).then((response) => response.json());
}
