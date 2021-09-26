import "../styles/home.scss";
import Paste from "../components/Paste";
import { useEffect, useState } from "react";

const Home = (props) => {
	const [pastes, setPastes] = useState([]);
	const [randomPastes, setRandomPastes] = useState([]);
	const [popularPastes, setPopularPastes] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [menu, setMenu] = useState(1);
	const handleMenuChange = (e) => {
		const currentMenu = parseInt(e.target.getAttribute("menu"));
		setMenu(currentMenu);
		Array.from(document.querySelectorAll(".code-type__item")).forEach(
			(item) => {
				item.classList.remove("selected");
			}
		);
		document
			.querySelector(`.code-type__item[menu="${currentMenu}"]`)
			.classList.add("selected");
	};
	useEffect(() => {
		const getPastes = async () => {
			if (props.token !== "") {
				setPastes(
					Array.from(await props.fetchPastes({ limit: 25, latest: "yes" }))
				);
				setLoading(false);
				setRandomPastes(
					Array.from(await props.fetchPastes({ limit: 25, shuffle: "yes" }))
				);
				setPopularPastes(
					Array.from(await props.fetchPopularPastes({ limit: 25 }))
				);
			}
			setLoading(false);
		};
		getPastes();
	}, [props.token]);
	return (
		<div>
			<div className="flex justify-center">
				<div className="code-type__wrapper flex">
					<div
						className="code-type__item selected"
						menu="1"
						onClick={handleMenuChange}
					>
						آخرین پیست ها
					</div>
					<div className="code-type__item" menu="2" onClick={handleMenuChange}>
						پیست های رندوم
					</div>
					<div className="code-type__item " menu="3" onClick={handleMenuChange}>
						معروف ترین ها
					</div>
				</div>
			</div>
			{isLoading && <h1>در حال بارگذاری...</h1>}

			<div className="pastes">
				<div className="pastes__wrapper">
					{menu === 1 &&
						pastes.map((item) => {
							let paste = item.paste;
							let user = item.user;
							let language = item.language;
							return (
								<Paste
									key={paste.id}
									id={paste.id}
									{...props}
									userName={
										user.persianUsername ? user.persianUsername : user.username
									}
									userLink={`/accounts/view/${user.username}`}
									userLocation={language.persianName || language.name}
									profilePic={
										user.avatar
											? `${props.backend}/avatars/${user.avatar}`
											: "/images/guest.jpg"
									}
									language={language.slug}
									code={
										paste.content.length > 150
											? paste.content.substr(0, 150) + "..."
											: paste.content
									}
									title={paste.title}
									description={
										paste.shortDescription
											? paste.shortDescription
											: "فاقد توضیحات"
									}
									name={paste.name}
									liked={item.liked}
								/>
							);
						})}
					{menu === 2 &&
						randomPastes.map((item) => {
							let paste = item.paste;
							let user = item.user;
							let language = item.language;
							return (
								<Paste
									key={paste.id}
									id={paste.id}
									{...props}
									userName={
										user.persianUsername ? user.persianUsername : user.username
									}
									userLink={`/accounts/view/${user.username}`}
									userLocation={language.persianName || language.name}
									profilePic={
										user.avatar
											? `${props.backend}/avatars/${user.avatar}`
											: "/images/guest.jpg"
									}
									language={language.slug}
									code={
										paste.content.length > 150
											? paste.content.substr(0, 150) + "..."
											: paste.content
									}
									title={paste.title}
									description={
										paste.shortDescription
											? paste.shortDescription
											: "فاقد توضیحات"
									}
									name={paste.name}
									liked={item.liked}
								/>
							);
						})}
					{menu === 3 &&
						popularPastes.map((item) => {
							let paste = item.paste;
							let user = item.user;
							let language = item.language;
							return (
								<Paste
									key={paste.id}
									id={paste.id}
									{...props}
									userName={
										user.persianUsername ? user.persianUsername : user.username
									}
									userLink={`/accounts/view/${user.username}`}
									userLocation={language.persianName || language.name}
									profilePic={
										user.avatar
											? `${props.backend}/avatars/${user.avatar}`
											: "/images/guest.jpg"
									}
									language={language.slug}
									code={
										paste.content.length > 150
											? paste.content.substr(0, 150) + "..."
											: paste.content
									}
									title={paste.title}
									description={
										paste.shortDescription
											? paste.shortDescription
											: "فاقد توضیحات"
									}
									name={paste.name}
									liked={item.liked}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default Home;
