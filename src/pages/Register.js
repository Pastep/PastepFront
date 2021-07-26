import {Redirect, Link} from "react-router-dom";
import {useState} from "react";
import "../styles/login.css";
import "../styles/register.css";

const Register = (props) => {
    const notFilledBorder = "1px solid red";
    const [currentState, setState] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [persianUsername, setPersianUsername] = useState("");
    const [englishUsername, setEnglishUsername] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handlePersianChange = (e) => {
        setPersianUsername(e.target.value);
    };
    const handleEnglishChange = (e) => {
        setEnglishUsername(e.target.value);
    }
    // if (props.loggedIn) {
    //     return <Redirect to="/accounts/dashboard" />;
    // }
    const next = (e) => {
        e.preventDefault();
        const fields = document.querySelectorAll(".field>div>input");
        fields.forEach((item) => {
            item.style.border = "1px solid var(--code-background)";
        })
        if (!email) {
            document.getElementById("email").style.border = notFilledBorder;
        }
        if (!password) {
            document.getElementById("password").style.border = notFilledBorder;
        }
        if (!persianUsername) {
            document.getElementById("persianUsername").style.border = notFilledBorder;
        }
        if (!englishUsername) {
            document.getElementById("englishUsername").style.border = notFilledBorder;
        }
    }

    return (
        <div className="login">
            <form className="form">
                <div className="header" style={{width: "100%"}}>
                    <h1>پیستپ</h1>
                </div>

                <div className="field">
                    <div>
                        <input id="email" name="email" type="text" placeholder="ایمیل" onChange={handleEmailChange}
                               value={email}/>
                        <input id="password" name="password" type="text" placeholder="پسورد"
                               onChange={handlePasswordChange} value={password}/>
                    </div>
                    <div>
                        <input id="persianUsername" name="persianUsername" type="text" placeholder="یوزرنیم به فارسی"
                               value={persianUsername} onChange={handlePersianChange}/>
                        <input id="englishUsername" name="englishUsername" type="text"
                               placeholder="یوزرنیم به انگلیسی" value={englishUsername} onChange={handleEnglishChange}/>
                    </div>
                </div>

                <div className="submit" onClick={next}>
                    <button type="submit" style={{width: "100%"}}>ثبت نام</button>
                </div>
                <div className="spacer">
                    <div></div>
                    <h2>یا</h2>
                    <div></div>
                </div>
                <div className="submit">
                    <Link to="/accounts/login">
                        ورود
                    </Link>
                </div>
            </form>
        </div>
    );

}

export default Register;