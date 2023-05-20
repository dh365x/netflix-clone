import { tvTypes } from "../../api/tv";

interface IProps {
	id: string;
	type: tvTypes;
}
function Detail({ id, type }: IProps) {
	return (
		<div>
			{type} {id}
		</div>
	);
}

export default Detail;
