import "../styles/team.scss";
import TeamMember from "../components/TeamMember";
const Team = (props) => {
	return (
		<div className="team">
			<div className="team__wrapper">
				<div className="team__header">
					<img width="136" height="136" src="/pastep.png" alt="" />
					<h4>سربازانِ امام در راه پیستپ</h4>
					<h2>"گَر تَوانی تا جَوانی کُد بِزَن"</h2>
					<div className="header__actions">
						<button className="actions__samples">نمونه کار های ما</button>
						<button className="actions__request">درخواست پروژه</button>
					</div>
				</div>
				<div className="team__sections">
					<div className="sections__wrapper">
						<div className="section section--selected">افراد تیم ما</div>
						<div className="section">پروژه های ما</div>
						<div className="section">نمونه کار ها</div>
					</div>
					<div className="sections__divider"></div>
					<div className="team-members">
						<TeamMember
							{...props}
							username="moorkiplier"
							discord="828484542746460220"
							description="Pastep is pastep"
							role="فرانت اند"
						></TeamMember>
						<TeamMember
							{...props}
							role="فرانت اند"
							username="MuffinPlayz"
							discord="416932883882573844"
						></TeamMember>
						<TeamMember
							{...props}
							username="pooria"
							discord="770212812785844264"
							role="بک اند و فرانت اند"
						></TeamMember>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Team;
