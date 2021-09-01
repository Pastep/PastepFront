import "../styles/profile.scss";
import Paste from "../components/Paste";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const Profile = (props) => {
        const {username} = useParams();
        const [user, setUser] = useState({});
        const [pastes, setPastes] = useState([]);
        const [followers, setFollowers] = useState([]);
        const [followings, setFollowings] = useState([]);
        const [popularPastes, setPopularPastes] = useState([]);
        const [menu, setMenu] = useState(1);
        const handleMenuChange = (e) => {
            const currentMenu = parseInt(e.target.getAttribute("menu"));
            setMenu(currentMenu);
            Array.from(document.querySelectorAll((".section"))).forEach((item) => {
                item.classList.remove("section--selected");
            });
            document.querySelector(`.section[menu="${currentMenu}"]`).classList.add("section--selected");
        }
        useEffect(() => {
            const getUser = async () => {
                let result;
                let fetchedUser = await props.fetchUserData({
                    name: "username",
                    value: username
                });
                if (fetchedUser.id) {
                    setUser(fetchedUser);
                    result = await props.fetchUserPastes(fetchedUser.id);
                    setPastes(result);
                    result = await props.fetchFollowers(fetchedUser.id);
                    setFollowers(result);
                    result = await props.fetchFollowings(fetchedUser.id);
                    setFollowings(result);
                    result = await props.fetchUserTrendingPastes({id: fetchedUser.id, limit: 25});
                    setPopularPastes(result);
                }

            }
            getUser();
        }, [username])
        return (
            <div className="profile">
                <div className="profile__wrapper">
                    <div className="profile__header">
                        <div className="header__right">
                            <img width="93" height="93"
                                 src={user.avatar ? props.backend + "/avatars/" + user.avatar : "/images/guest.jpg"}
                                 alt={user.username}/>
                            <div className="right__info">
                                <div className="name__wrapper">
                                    <h2>{user.persianUsername || user.username}</h2>
                                    {/*<h2>{username}</h2>*/}
                                    {/*<div className="badges">*/}
                                    {/*    <div className="badges__wrapper">*/}
                                    {/*        <div className="badge badge--purple">*/}
                                    {/*            <h4>ادمین</h4>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                                <h3>{user.bio}</h3>
                            </div>
                        </div>
                        {props.currentUser.id !== user.id &&
                        <div className="header__left">

                            <div className="left__followers">
                                {followers && <div
                                    className="followers__count">{followers.length - 2 <= 0 ? "" : followers.length - 2}</div>}
                                {followers.map((item) => {
                                    return <Link to={item.username}>
                                        <img width="25" height="25"
                                             src={item.avatar ? `${props.backend}/avatars/${item.avatar}` : "/images/guest.jpg"}/>
                                    </Link>
                                })}
                            </div>
                            <button className="left__follow" onClick={async () => {
                                const result = await props.fetchToggleFollow(user.id);
                                if (result.id) {
                                    setFollowers([...followers, props.currentUser]);
                                } else if (result.message === "user successfully un followed") {
                                    setFollowers(followers.filter(item => item.id !== props.currentUser.id))
                                }

                            }}>{followers.filter(item => item.id == props.currentUser.id).length ? "دنبال شده" : "دنبال کردن"}</button>

                        </div>}
                    </div>
                    <div className="profile__sections">
                        <div className="sections__wrapper">
                            <div className="section section--selected" menu="1" onClick={handleMenuChange}>آخرین پُست ها
                            </div>
                            <div className="section" menu="2" onClick={handleMenuChange}>معروف ترین پیست ها</div>
                            <div className="section" menu="3" onClick={handleMenuChange}>دنبال شوندگان</div>
                            <div className="section" menu="4" onClick={handleMenuChange}>دنبال کرده ها</div>

                        </div>
                        <div className="sections__divider"></div>
                    </div>
                    {menu === 1 && <div className="profile__pastes">
                        <div className="pastes__wrapper">
                            {pastes.map((item) => {
                                let paste = item.paste;
                                let user = item.user;
                                let language = item.language;
                                return <Paste
                                    key={paste.id}
                                    id={paste.id}
                                    {...props}
                                    userName={user.persianUsername ? user.persianUsername : user.username}
                                    userLocation={language.persianName}
                                    profilePic={user.avatar ? `${props.backend}/avatars/${user.avatar}` : "/images/guest.jpg"}
                                    language={language.slug}
                                    code={paste.content.length > 150 ? paste.content.substr(0, 150) + "..." : paste.content}
                                    title={paste.title}
                                    description={paste.shortDescription ? paste.shortDescription : "فاقد توضیحات"}
                                    name={paste.name}
                                    liked={item.liked}
                                />
                            })}
                        </div>
                    </div>}
                    {menu === 2 && <div className="profile__pastes">
                        <div className="pastes__wrapper">
                            {popularPastes.map((item) => {
                                let paste = item.paste;
                                let user = item.user;
                                let language = item.language;
                                return <Paste
                                    key={paste.id}
                                    id={paste.id}
                                    {...props}
                                    userName={user.persianUsername ? user.persianUsername : user.username}
                                    userLocation={language.persianName}
                                    profilePic={user.avatar ? `${props.backend}/avatars/${user.avatar}` : "/images/guest.jpg"}
                                    language={language.slug}
                                    code={paste.content.length > 150 ? paste.content.substr(0, 150) + "..." : paste.content}
                                    title={paste.title}
                                    description={paste.shortDescription ? paste.shortDescription : "فاقد توضیحات"}
                                    name={paste.name}
                                    liked={item.liked}
                                />
                            })}
                        </div>
                    </div>}
                    {menu === 3 && <div className="followers">
                        {!followers.length && <h1>No followers</h1>}

                        {followers.map((item) => {
                            return <div className="follower" key={item.id}>
                                <img src={item.avatar ? `${props.backend}/avatars/${item.avatar}` : "/images/guest.jpg"} alt={item.username}/>
                                <h3>{item.persianUsername || item.username}</h3>
                                <div className="submit">
                                    <Link to={`/accounts/view/${item.username}`}>مشاهده</Link>
                                </div>
                            </div>
                        })}
                    </div>}
                    {menu === 4 && <div className="followers">
                        {!followings.length && <h1>No followings</h1>}
                        {followings.map((item) => {
                            return <div className="follower" key={item.id}>
                                <img src={item.avatar ? `${props.backend}/avatars/${item.avatar}` : "/images/guest.jpg"} alt={item.username}/>
                                <h3>{item.persianUsername || item.username}</h3>
                                <div className="submit">
                                    <Link to={`/accounts/view/${item.username}`}>مشاهده</Link>
                                </div>
                            </div>
                        })}
                    </div>}

                </div>
            </div>
        );
    }
;
export default Profile;
