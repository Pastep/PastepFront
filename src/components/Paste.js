import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark, vs } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useState } from "react";
import "../styles/paste.scss";

const Paste = (props) => {
	const [isLiked, setLiked] = useState(false);
	return (
		<div className="paste">
			<div className="paste__wrapper">
				<div className="paste__header">
					<div className="header__profile-info">
						<img width="48" height="48" src={props.profilePic} alt="" />
						<div className="profile-info__name">
							<p>{props.userName}</p>
							<p className="text-muted">{props.userLocation}</p>
						</div>
					</div>
					<button className="header__more-info">اطلاعات بیشتر</button>
				</div>
				<div className="paste__code">
					<div className="code">
						<div className="code__wrapper">
							<SyntaxHighlighter
								language={props.language}
								style={props.currentMode === "light" ? vs : atomOneDark}
								className="code__wrapper2"
							>
								{props.code}
							</SyntaxHighlighter>
						</div>
					</div>
					<div className="code__features">
						<div className="features__right">
							<img
								width="24"
								height="24"
								src={isLiked ? "/images/heart-fill.svg" : "/images/heart.svg"}
								onClick={() => setLiked(!isLiked)}
								alt=""
							/>
							<svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M19 9.50003C19.0034 10.8199 18.6951 12.1219 18.1 13.3C17.3944 14.7118 16.3098 15.8992 14.9674 16.7293C13.6251 17.5594 12.0782 17.9994 10.5 18C9.18013 18.0035 7.87812 17.6951 6.7 17.1L1 19L2.9 13.3C2.30493 12.1219 1.99656 10.8199 2 9.50003C2.00061 7.92179 2.44061 6.37488 3.27072 5.03258C4.10083 3.69028 5.28825 2.6056 6.7 1.90003C7.87812 1.30496 9.18013 0.996587 10.5 1.00003H11C13.0843 1.11502 15.053 1.99479 16.5291 3.47089C18.0052 4.94699 18.885 6.91568 19 9.00003V9.50003Z" stroke="#767676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</div>
						<div className="features__left">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="#767676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</div>
					</div>
				</div>
				<div className="paste__footer">
					<h3 className="footer__title">{props.title}</h3>
					<p className="footer__description">{props.description}</p>
				</div>
			</div>
		</div>
	);
};

export default Paste;
