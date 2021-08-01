import "../../styles/dashboard-profile.scss";
import Paste from "../Paste";
import {useState} from "react";
import Edit from "./Edit";
import {useEffect} from "react";

const Profile = (props) => {
    const [username, setUsername] = useState(props.user.persianUsername);
    const [bio, setBio] = useState(props.user.bio);
    const [pastes, setPastes] = useState([]);
    useEffect(() => {
        const getUser = async () => {
            const fetchedPastes = await props.fetchUserPastes(props.user.id);
            setPastes(fetchedPastes);
        }
        getUser();
    }, [])

    const updateUser = async (e) => {
        e.preventDefault();
        const file = document.getElementById("file").files[0];
        if (file) {
            const resultAvatar = await props.fetchAvatarUpdate(file);
            if (resultAvatar.avatar) {
                props.user.avatar = resultAvatar.avatar;
                props.setUser(props.user);
                e.target.style.backgroundColor = "rgb(22, 232, 35)";
                setTimeout(() => {
                    e.target.style.backgroundColor = "";
                }, 2000);
            }
        }
        const result = await props.fetchUserUpdate({
            persianUsername: username,
            bio: bio
        });
        if (result.message === "User updated successfully") {
            props.user.persianUsername = username;
            props.user.bio = bio;
            props.setUser(props.user);
            e.target.style.backgroundColor = "rgb(22, 232, 35)";
            setTimeout(() => {
                e.target.style.backgroundColor = "";
            }, 2000);
        }
    }
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handleBioChange = (e) => {
        setBio(e.target.value);
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        let isFind = false;
        const types = [
            '.jpg',
            '.jfif',
            '.png',
            'jpeg'
        ];
        types.forEach((item, counter) => {
            if (file.name.toLowerCase().includes(item)) {
                document.getElementById('userAvatar').src = window.URL.createObjectURL(file);
                isFind = true;
            }
        })
        if (!isFind) {
            e.target.files = [];
            return false;
        }
    }

    return (
        <div className="profile">
            <div className="profile__wrapper">
                <div className="profile__header">
                    <div className="header__right">
                        <div className="editable-area">
                            <svg fill="var(--text)" enableBackground="new 0 0 45 45" height="45" viewBox="0 0 45 45"
                                 width="45"
                                 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <style>.a{"fill:#231F20;"}</style>
                                <rect height="23" transform="matrix(-0.7071 -0.7072 0.7072 -0.7071 38.2666 48.6029)"
                                      width="11" x="23.7"
                                      y="4.9" className="a"/>
                                <path
                                    d="M44.1 3.7l-2.5-2.5c-1.4-1.4-3.6-1.4-5 0L34.9 2.9l7.8 7.8 1.7-1.7C45.8 7.6 45.5 5.1 44.1 3.7z"
                                    className="a"/>
                                <polygon points="16 22.2 16 30 23.2 30 " className="a"/>
                                <path
                                    d="M29 40H5V16h12.6l5-5H3.5C1.8 11 0 11.8 0 13.5v28C0 43.2 1.8 45 3.5 45h28c1.7 0 2.5-1.8 2.5-3.5V23.6l-5 5V40z"
                                    className="a"/>
                            </svg>
                            <input hidden type="file" id="file" onChange={handleImageChange}/>
                            <label htmlFor="file" style={{cursor: "pointer"}}>
                                <img id="userAvatar" width="93" height="93"
                                     src={props.user.avatar ? props.backend + "/avatars/" + props.user.avatar : "/images/guest.jpg"}
                                     alt={props.username}/>
                            </label>
                        </div>
                        <div className="right__info">
                            <div className="name__wrapper">
                                <Edit handler={handleUsernameChange} value={username}/>
                                {/*<h2>{username}</h2>*/}
                                <button onClick={updateUser}>ثبت تغییرات</button>
                            </div>
                            <Edit handler={handleBioChange} value={bio}/>
                        </div>
                    </div>

                </div>
                <div className="profile__sections">

                    <div className="sections__divider"></div>
                </div>
                <div className="profile__pastes">
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
                                delete={true}
                                pastes={pastes}
                                setPastes={setPastes}
                                edit={true}
                            />
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Profile;
