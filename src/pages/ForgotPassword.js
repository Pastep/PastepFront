import {Redirect, Link} from "react-router-dom";
import {useState} from "react";
import "../styles/login.css";

const ForgotPassword = (props) => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [messages, setMessage] = useState("");
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
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
        if (email === "") {
            isOk = false;
            document.getElementById("email").style.border = "1px solid red";
        }
        if (newPassword === "") {
            isOk = false;
            document.getElementById("new_passsowrd").style.border = "1px solid red";
        }

        if (isOk === true) {
            const result = await props.fetchPasswordReset({
                email: email,
                new_password: newPassword
            });
            if (result.message === "Email sent.") {
                setMessage("ایمیل عوض کردن پسورد فرستاده شد.");
                setError("");
            } else if (result.message === "User not found.") {
                setError("اکانتی با این ایمیل یافت نشد.")
            } else if (result.details.length) {
                setError(result.details[0].message);
            }
        }
    }

    return (
        <div className="login">
            {props.user.id && <Redirect to="/accounts/dashboard"/>}
            <form className="form" onSubmit={next}>
                <div className="header" style={{width: "100%"}}>
                    <h1>پیستپ</h1>
                </div>

                <div className="field">
                    <input id="email" name="username" type="text" placeholder="ایمیل"
                           onChange={handleEmailChange}
                           value={email}/>
                    <input minLength="3" id="new_password" name="password" type="password" placeholder="پسورد جدید"
                           onChange={handlePasswordChange}
                           value={newPassword}/>
                </div>

                {error && <div className="error">{error}</div>}
                {messages && <div style={{backgroundColor: "rgb(22, 232, 35)"}} className="error">{messages}</div>}

                <div className="submit">
                    <input type="submit" value="عوض کردن"/>
                </div>
                <div className="spacer">
                    <div></div>
                    <h2>یا</h2>
                    <div></div>
                </div>
                <div className="submit" style={{marginBottom: "15px"}}>
                    <Link to="/accounts/register">
                        ثبت نام
                    </Link>
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

export default ForgotPassword;