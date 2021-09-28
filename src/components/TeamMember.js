import "../styles/team-member.scss";
import FetchFunctions from "../Classes/FetchFunctions";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const TeamMember = ({
	username,
	description,
	role,
	discord,
	fetchFunctions = new FetchFunctions(),
}) => {
	const [user, setUser] = useState({});
	useEffect(() => {
		const doThings = async () => {
			const { data, response } = await fetchFunctions.user({
				name: "username",
				value: username,
			});
			if (response.status === 200) {
				setUser(data);
			} else if (response.status === 404) {
				setUser({ code: 404 });
			}
		};
		doThings();
	}, []);
	if (!Object.keys(user).length) {
		return (
			<div className="team-member paste">
				<div className="loading"></div>
				<h1 className="loading"></h1>
				<p className="loading"></p>
				<div className="social-medias submit">
					<a
						target="_blank"
						rel="noreferrer"
						href={`https://discordapp.com/channels/@me/${discord}/`}
					>
						دیسکورد
					</a>
					<Link to={`/accounts/view/${username}`}>پیج شخصی</Link>
				</div>
			</div>
		);
	}
	if (user.code === 404) {
		return (
			<div className="team-member paste">
				<img className="loading" src="/images/guest.jpg" alt="notFoundedUser" />
				<h1>یوزر پیدا نشد</h1>
				<p>یوزری که پیدا نشده</p>
				<div className="social-medias submit">
					<a
						target="_blank"
						rel="noreferrer"
						href={`https://discordapp.com/channels/@me/${discord}/`}
					>
						دیسکورد
					</a>
					<Link to={`/accounts/view/${username}`}>پیج شخصی</Link>
				</div>
			</div>
		);
	}
	return (
		<div className="team-member paste">
			<img
				className="loading"
				alt="member"
				src={
					user.avatar
						? `${fetchFunctions.fetchRoutes.backend}/avatars/${user.avatar}`
						: "/images/guest.jpg"
				}
			/>
			<h1>
				{user.persianUsername || user.username} | {role}
			</h1>
			<p>{description || user.bio || "بدون توضیحات"}</p>
			<div className="social-medias submit">
				<a
					target="_blank"
					rel="noreferrer"
					href={`https://discordapp.com/channels/@me/${discord}/`}
				>
					دیسکورد
				</a>
				<Link to={`/accounts/view/${username}`}>پیج شخصی</Link>
			</div>
		</div>
	);
};

export default TeamMember;
