import {Redirect, Link} from "react-router-dom";
import {useState} from "react";
import "../styles/login.css";
import "../styles/register.css";

const Register = (props) => {
    const notFilledBorder = "1px solid red";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [persianUsername, setPersianUsername] = useState("");
    const [englishUsername, setEnglishUsername] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [error, setError] = useState("");

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
    const next = async (e) => {
        e.preventDefault();
        const fields = document.querySelectorAll(".field>div>input");
        fields.forEach((item) => {
            item.style.border = "1px solid var(--code-background)";
        })
        let isOk = true;
        if (!email) {
            isOk = false;
            document.getElementById("email").style.border = notFilledBorder;
        }
        if (!password) {
            isOk = false;
            document.getElementById("password").style.border = notFilledBorder;
        }
        if (!persianUsername) {
            isOk = false;
            document.getElementById("persianUsername").style.border = notFilledBorder;
        }
        if (!englishUsername) {
            isOk = false;
            document.getElementById("englishUsername").style.border = notFilledBorder;
        }
        if (isOk) {
            const result = await props.fetchRegister(englishUsername, persianUsername, email, password);
            if (result.id) {
                setSuccessful(true);
            } else if (result.message) {
                setError("قبلا این ایمیل یا یوزرنیم استفاده شده است.");
                document.getElementById("email").style.border = notFilledBorder;
                document.getElementById("englishUsername").style.border = notFilledBorder;
            } else if (result.details.length) {
                setError(result.details[0].message);
            }
        }
    }

    if (props.user.id) {
        return <Redirect to="/accounts/dashboard" />;
    }

    return (
        <div className="login">
            <form className="form">
                <div className="header" style={{width: "100%"}}>
                    <h1>پیستپ</h1>
                </div>

                <div className="field">
                    <div>
                        <input id="email" name="email" type="email" placeholder="ایمیل" onChange={handleEmailChange}
                               value={email}/>
                        <input minLength="3" id="password" name="password" type="password" placeholder="پسورد"
                               onChange={handlePasswordChange} value={password}/>
                    </div>
                    <div>
                        <input minLength="3" id="persianUsername" name="persianUsername" type="text" placeholder="یوزرنیم به فارسی"
                               value={persianUsername} onChange={handlePersianChange}/>
                        <input minLength="3" id="englishUsername" name="englishUsername" type="text"
                               placeholder="یوزرنیم به انگلیسی" value={englishUsername} onChange={handleEnglishChange}/>
                    </div>
                </div>
                {successful && <div className="error" style={{backgroundColor: "rgb(22, 232, 35)"}}>
                    اکانت با موفقیت ساخته شد، برای فعال سازی اکانت، روی لینکی که به ایمیل شما فرستاده شده است، کلیک کنید.
                </div>}
                {error && <div className="error">
                    {error}
                </div>}
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