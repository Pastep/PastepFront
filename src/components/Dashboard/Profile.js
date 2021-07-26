import "../../styles/dashboard-profile.scss";
import Paste from "../Paste";
import {useState} from "react";
import { Redirect } from "react-router-dom";
import Edit from "./Edit";

const Profile = (props) => {
    const [username, setUsername] = useState(props.user.persianUsername);
    const [bio, setBio] = useState(props.user.bio);
    const [image, setImage] = useState("");
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handleBioChange = (e) => {
        setBio(e.target.value);
    }
    const handleImageChange = (e) => {

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
                                <img width="93" height="93" src={props.user.avatar ? props.backend + "/avatars/" + props.user.avatar : "/images/guest.png"} alt=""/>
                            </label>
                        </div>
                        <div className="right__info">
                            <div className="name__wrapper">
                                <Edit handler={handleUsernameChange} value={username}/>
                                {/*<h2>{username}</h2>*/}
                                <div className="badges">
                                    <div className="badges__wrapper">
                                        <div className="badge badge--purple">
                                            <h4>ادمین</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Edit handler={handleBioChange} value={bio}/>
                        </div>
                    </div>
                    <div className="header__left">
                        <div className="left__followers">
                            <div className="followers__count">۱۲+</div>
                            <img width="25" height="25" src="/images/werdox.png"></img>
                            <img width="25" height="25" src="/images/werdox.png"></img>
                        </div>
                        <button className="left__follow">دنبال کردن</button>
                    </div>
                </div>
                <div className="profile__sections">
                    <div className="sections__wrapper">
                        <div className="section section--selected">آخرین پُست ها</div>
                        <div className="section">معروف ترین پیست ها</div>
                        <div className="section">دنبال کرده ها</div>
                        <div className="section">دنبال شوندگان</div>
                    </div>
                    <div className="sections__divider"></div>
                </div>
                <div className="profile__pastes">
                    <div className="pastes__wrapper">
                        <Paste
                            {...props}
                            userName="Werdox"
                            userLocation="شیراز | ایران"
                            profilePic="/images/werdox.png"
                            language="javascript"
                            code={"console.log('Salam');\nconst react = require('react');\nconst express = require('express');"}
                            title="یک کلاس در تایپ اسکریپت"
                            description="پرنده ها بال میزنند و آسمان را تماشا میکنند. ناگهان پرنده ای پر
            میزند و دیگر آسمان را تماشا نمیکند!"
                        />
                        <Paste
                            {...props}
                            userName="Werdox"
                            userLocation="شیراز | ایران"
                            profilePic="/images/werdox.png"
                            language="javascript"
                            code={"console.log('Salam');\nconst react = require('react');\nconst express = require('express');"}
                            title="یک کلاس در تایپ اسکریپت"
                            description="پرنده ها بال میزنند و آسمان را تماشا میکنند. ناگهان پرنده ای پر
            میزند و دیگر آسمان را تماشا نمیکند!"
                        />
                        <Paste
                            {...props}
                            userName="Werdox"
                            userLocation="شیراز | ایران"
                            profilePic="/images/werdox.png"
                            language="javascript"
                            code={"console.log('Salam');\nconst react = require('react');\nconst express = require('express');"}
                            title="یک کلاس در تایپ اسکریپت"
                            description="پرنده ها بال میزنند و آسمان را تماشا میکنند. ناگهان پرنده ای پر
            میزند و دیگر آسمان را تماشا نمیکند!"
                        />
                        <Paste
                            {...props}
                            userName="Werdox"
                            userLocation="شیراز | ایران"
                            profilePic="/images/werdox.png"
                            language="javascript"
                            code={"console.log('Salam');\nconst react = require('react');\nconst express = require('express');"}
                            title="یک کلاس در تایپ اسکریپت"
                            description="پرنده ها بال میزنند و آسمان را تماشا میکنند. ناگهان پرنده ای پر
            میزند و دیگر آسمان را تماشا نمیکند!"
                        />
                        <Paste
                            {...props}
                            userName="Werdox"
                            userLocation="شیراز | ایران"
                            profilePic="/images/werdox.png"
                            language="javascript"
                            code={"console.log('Salam');\nconst react = require('react');\nconst express = require('express');"}
                            title="یک کلاس در تایپ اسکریپت"
                            description="پرنده ها بال میزنند و آسمان را تماشا میکنند. ناگهان پرنده ای پر
            میزند و دیگر آسمان را تماشا نمیکند!"
                        />
                        <Paste
                            {...props}
                            userName="Werdox"
                            userLocation="شیراز | ایران"
                            profilePic="/images/werdox.png"
                            language="javascript"
                            code={"console.log('Salam');\nconst react = require('react');\nconst express = require('express');"}
                            title="یک کلاس در تایپ اسکریپت"
                            description="پرنده ها بال میزنند و آسمان را تماشا میکنند. ناگهان پرنده ای پر
            میزند و دیگر آسمان را تماشا نمیکند!"
                        />
                        <Paste
                            {...props}
                            userName="Werdox"
                            userLocation="شیراز | ایران"
                            profilePic="/images/werdox.png"
                            language="javascript"
                            code={"console.log('Salam');\nconst react = require('react');\nconst express = require('express');"}
                            title="یک کلاس در تایپ اسکریپت"
                            description="پرنده ها بال میزنند و آسمان را تماشا میکنند. ناگهان پرنده ای پر
            میزند و دیگر آسمان را تماشا نمیکند!"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Profile;
