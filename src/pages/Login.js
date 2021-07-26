import {Redirect, Link} from "react-router-dom";
import {useState} from "react";
import "../styles/login.css";

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const fields = Array.from(document.querySelectorAll(".field>input"));
    fields.forEach((item) => {
        item.style.border = "1px solid var(--code-background)";
    })
    const next = async (e) => {
        e.preventDefault();
        if (!e.isTrusted) {
            return;
        }
        let isOk = true;
        if (username === "") {
            isOk = false;
            document.getElementById("username").style.border = "1px solid red";
        }
        if (password === "") {
            isOk = false;
            document.getElementById("password").style.border = "1px solid red";
        }

        if (isOk === true) {
            const result = await props.fetchLogin(username, password);
            if (result.token) {
                props.setToken(result.token);
                return;
            }
            if (result.message == "User not found.") {
                document.getElementById("username").style.border = "1px solid red";
            } else if (result.message == "Password is incorrect.") {
                document.getElementById("password").style.border = "1px solid red";
            }
        }
    }

    return (
        <div className="login">
            {props.user.id && <Redirect to="/accounts/dashboard" />}
            <form className="form" onSubmit={next}>
                <div className="header" style={{width: "100%"}}>
                    <h1>پیستپ</h1>
                </div>

                <div className="field">
                    <input id="username" name="username" type="text" placeholder="یوزرنیم یا ایمیل"
                           onChange={handleUsernameChange}
                           value={username}/>
                    <input id="password" name="password" type="text" placeholder="پسورد"
                           onChange={handlePasswordChange}
                           value={password}/>
                </div>

                <div className="submit">
                    <input type="submit" value="ورود"/>
                </div>
                <div className="spacer">
                    <div></div>
                    <h2>یا</h2>
                    <div></div>
                </div>
                <div className="submit">
                    <Link to="/accounts/register">
                        ثبت نام
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;