import SyntaxHighlighter from "react-syntax-highlighter";
import {atomOneDark, vs} from "react-syntax-highlighter/dist/esm/styles/hljs";
import {useState} from "react";
import {Link} from "react-router-dom";
import "../styles/paste.scss";

const Paste = (props) => {
    const [isLiked, setLiked] = useState(props.liked);
    return (
        <div className="paste">
            <div className="paste__wrapper">
                <div className="paste__header">
                    <div className="header__profile-info">
                        <img width="48" height="48" src={props.profilePic} alt=""/>
                        <div className="profile-info__name">
                            <Link to={props.userLink}>{props.userName}</Link>
                            <p className="text-muted">{props.userLocation}</p>
                        </div>
                    </div>
                    <Link className="header__more-info" to={`/pastes/view/${props.name}`}>اطلاعات بیشتر</Link>
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
                                onClick={async () => {
                                    const result = await props.pasteLikeToggle(props.id);
                                    if (result.message === "successfully disliked paste.") {
                                        setLiked(false);
                                    } else if (result.id) {
                                        setLiked(true);
                                    }
                                }}
                                alt=""
                            />
                            <svg width="24" height="24" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19 9.50003C19.0034 10.8199 18.6951 12.1219 18.1 13.3C17.3944 14.7118 16.3098 15.8992 14.9674 16.7293C13.6251 17.5594 12.0782 17.9994 10.5 18C9.18013 18.0035 7.87812 17.6951 6.7 17.1L1 19L2.9 13.3C2.30493 12.1219 1.99656 10.8199 2 9.50003C2.00061 7.92179 2.44061 6.37488 3.27072 5.03258C4.10083 3.69028 5.28825 2.6056 6.7 1.90003C7.87812 1.30496 9.18013 0.996587 10.5 1.00003H11C13.0843 1.11502 15.053 1.99479 16.5291 3.47089C18.0052 4.94699 18.885 6.91568 19 9.00003V9.50003Z"
                                    stroke="#767676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {props.delete && <svg onClick={async () => {
                                const result = await props.deletePaste(props.id);
                                if (result.message == "Paste successfully deleted") {
                                    props.setPastes(props.pastes.filter(item => item.paste.id !== props.id));
                                }
                            }} id="deletesvg" width="24" height="24" xmlns="http://www.w3.org/2000/svg"
                                                  xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                  viewBox="0 0 512 512" style={{enableBackground:"new 0 0 512 512", strokeWidth: "0", fill:"#767676"}} xmlSpace="preserve"><g><g><g>
                                <path d="M490.667,85.333h-42.665H448h-68.675l-7.012-28.062C363.905,23.609,333.658,0,298.965,0h-85.931
				c-34.693,0-64.94,23.609-73.348,57.273l-7.012,28.06H64.002c0,0-0.001,0-0.001,0c0,0,0,0-0.001,0H21.333
				C9.551,85.333,0,94.885,0,106.667C0,118.449,9.551,128,21.333,128h22.488l17.974,323.53C63.683,485.452,91.744,512,125.719,512
				h260.565c33.975,0,62.036-26.548,63.924-60.468L468.183,128h22.484c11.782,0,21.333-9.551,21.333-21.333
				C512,94.885,502.449,85.333,490.667,85.333z M181.081,67.614c3.663-14.664,16.838-24.948,31.954-24.948h85.931
				c15.116,0,28.291,10.284,31.953,24.946l4.428,17.721H176.653L181.081,67.614z M407.608,449.163
				c-0.63,11.311-9.993,20.17-21.324,20.17H125.719c-11.33,0-20.694-8.859-21.324-20.172L86.554,128h62.78h213.333h62.784
				L407.608,449.163z"/>
                                <path d="M170.667,170.667c-11.782,0-21.333,9.551-21.333,21.333v213.333c0,11.782,9.551,21.333,21.333,21.333
				c11.782,0,21.333-9.551,21.333-21.333V192C192,180.218,182.449,170.667,170.667,170.667z"/>
                                <path d="M256,170.667c-11.782,0-21.333,9.551-21.333,21.333v213.333c0,11.782,9.551,21.333,21.333,21.333
				s21.333-9.551,21.333-21.333V192C277.333,180.218,267.782,170.667,256,170.667z"/>
                                <path d="M341.333,170.667C329.551,170.667,320,180.218,320,192v213.333c0,11.782,9.551,21.333,21.333,21.333
				c11.782,0,21.333-9.551,21.333-21.333V192C362.667,180.218,353.115,170.667,341.333,170.667z"/>
                            </g></g></g>
                            </svg>}
                        </div>
                        <div className="features__left">
                            {props.edit ? <Link to={`/pastes/edit/${props.id}`}>
                                <svg fill="#767676" strokeWidth="0" width="24" height="24" enable-background="new 0 0 45 45" viewBox="0 0 45 45"
                                     width="45" xmlns="http://www.w3.org/2000/svg"
                                     xmlnsXlink="http://www.w3.org/1999/xlink">
                                    <style>.afill:#231F20;</style>
                                    <rect height="23" transform="matrix(-0.7071 -0.7072 0.7072 -0.7071 38.2666 48.6029)"
                                          width="11" x="23.7" y="4.9" className="a"></rect>
                                    <path
                                        d="M44.1 3.7l-2.5-2.5c-1.4-1.4-3.6-1.4-5 0L34.9 2.9l7.8 7.8 1.7-1.7C45.8 7.6 45.5 5.1 44.1 3.7z"
                                        className="a"></path>
                                    <polygon points="16 22.2 16 30 23.2 30 " className="a"></polygon>
                                    <path
                                        d="M29 40H5V16h12.6l5-5H3.5C1.8 11 0 11.8 0 13.5v28C0 43.2 1.8 45 3.5 45h28c1.7 0 2.5-1.8 2.5-3.5V23.6l-5 5V40z"
                                        className="a"></path>
                                </svg>
                            </Link> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                                    stroke="#767676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>}

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
