const BASE_URL = `https://image.tmdb.org/t/p`;

export function makeImagePath(id: string, format?: string) {
	if (!id) {
		return `https://hips.hearstapps.com/hmg-prod/images/legacy-fre-image-placeholder-1655513735.png?crop=1.00xw:0.751xh;0,0.122xh&resize=1200:*`;
	} else {
		return `${BASE_URL}/${format ? format : "original"}/${id}`;
	}
}

export enum movieTypes {
	search = "search",
	popular = "popular",
	upcoming = "upcoming",
	top_rated = "top_rated",
	now_playing = "now_playing",
}
