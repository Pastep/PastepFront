import "../styles/team.scss";

const Team = () => {
	return (
		<div className="team">
			<div className="team__wrapper">
				<div className="team__header">
					<img width="136" height="136" src="/pastep.png" alt="" />
					<h4>سربازانِ امام در راه پیستپ</h4>
					<h2>"میازار موری که دانه کش است"</h2>
					<h2>"که جان دارد و جان شیرین خوش است"</h2>
					<div className="header__actions">
						<button className="actions__samples">نمونه کار های ما</button>
						<button className="actions__request">درخواست پروژه</button>
					</div>
				</div>
				<div className="team__sections">
					<div className="sections__wrapper">
						<div className="section section--selected">پروژه های ما</div>
						<div className="section">نمونه کار ها</div>
						<div className="section">افراد تیم ما</div>
					</div>
					<div className="sections__divider"></div>
				</div>
			</div>
		</div>
	);
};

export default Team;
