import { useLocation } from "react-router-dom";

function Search() {
	const location = useLocation();
	const keyword = new URLSearchParams(location.search).get("keyword");

	console.log("location", location);
	console.log("keyword", keyword);

	return <div></div>;
}

export default Search;
