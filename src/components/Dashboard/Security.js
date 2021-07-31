import {useState} from "react";
import "../../styles/security.css";
import Edit from "./Edit";

const Security = (props) => {
    const [email, setEmail] = useState(props.user.email);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState(props.user.username);
    const [persianUsername, setPersianUsername] = useState(props.user.persianUsername);
    const updateUser = async (e) => {
        e.preventDefault();
        const input = e.target[0];
        const button = e.target[1];
        let body = {};
        body[input.name] = input.value;
        const result = await props.fetchUserUpdate(body);
        if (result.message === "User updated successfully"){
            props.user[input.name] = input.value;
            props.setUser(props.user);
            button.style.backgroundColor = "rgb(22, 232, 35)";
            setTimeout(() => {
                button.style.backgroundColor = "";
            }, 2000);
        }
    }
    return (
        <div className="security">
            <form className="email" onSubmit={updateUser}>
                <div className="top">
                    <h1>ایمیل</h1>
                </div>
                <Edit required={true} name="email" handler={(e) => {setEmail(e.target.value);}} value={email} type="email" />
                <div className="submit">
                    <button>تغییر ایمیل</button>
                </div>
            </form>
            <form className="password" onSubmit={updateUser}>
                <div className="top">
                    <h1>پسورد</h1>
                </div>
                <Edit autoComplete="new-password" required={true} name="password" handler={(e) => {setPassword(e.target.value);}} value={password} type="password" placeHolder="پسورد جدید را وارد کنید"/>
                <div className="submit">
                    <button>تغییر پسورد</button>
                </div>
            </form>
            <form className="email" onSubmit={updateUser}>
                <div className="top">
                    <h1>نام کاربری فارسی</h1>
                </div>
                <Edit name="persianUsername" handler={(e) => {setPersianUsername(e.target.value);}} value={persianUsername} />
                <div className="submit">
                    <button>ثبت</button>
                </div>
            </form>
            <form className="email" onSubmit={updateUser}>
                <div className="top">
                    <h1>نام کاربری انگلیسی</h1>
                </div>
                <Edit required={true} name="username" handler={(e) => {setUsername(e.target.value);}} value={username} />
                <div className="submit">
                    <button>ثبت</button>
                </div>
            </form>
        </div>
    );
};

export default Security;