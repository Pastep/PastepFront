import Paste from "../Paste";
import "../../styles/Featured.css";

const Featured = (props) => {
	const paste = {
		name: "Paste name",
	};
	const user = {
		avatar:
			"https://pastep.com/media/avatars/download_Gney3u7.jpg.36x36_q85_crop.jpg",
		name: "pooria",
	};
	return (
		<div className="featured">
			<h1>Featured</h1>
			<div className="boxes">
				<Paste paste={paste} user={user} {...props} />
				<Paste paste={paste} user={user} {...props} />
				<Paste paste={paste} user={user} {...props} />
				<Paste paste={paste} user={user} {...props} />
			</div>
		</div>
	);
};

export default Featured;
