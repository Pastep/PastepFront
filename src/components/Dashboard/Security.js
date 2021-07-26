import {useState} from "react";
import "../../styles/security.css";
import Edit from "./Edit";

const Security = (props) => {
    const [email, setEmail] = useState(props.user.email);
    const [password, setPassword] = useState("");

    return (
        <div className="security">
            <div className="email">
                <div className="top">
                    <h1>ایمیل</h1>
                </div>
                <Edit handler={(e) => {setEmail(e.target.value);}} value={email} />
                <div className="submit">
                    <button>تغییر ایمیل</button>
                </div>
            </div>
            <div className="password">
                <div className="top">
                    <h1>پسورد</h1>
                </div>
                <Edit handler={(e) => {setPassword(e.target.value);}} value={password} type="password" placeHolder="پسورد جدید را وارد کنید"/>
                <div className="submit">
                    <button>تغییر پسورد</button>
                </div>
            </div>
        </div>
    );
};

export default Security;