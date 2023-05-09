const BASE_URL = `https://image.tmdb.org/t/p`;

export function makeImagePath(id: string, format?: string) {
	return `${BASE_URL}/${format ? format : "original"}/${id}`;
}

export enum movieTypes {
	popular = "popular",
	upcoming = "upcoming",
	top_rated = "top_rated",
	now_playing = "now_playing",
}
