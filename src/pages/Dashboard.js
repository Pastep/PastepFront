import {useState} from "react";
import "../styles/dashboard.css";
import {Scrollbar} from "react-scrollbars-custom";

// Pages
import Security from "../components/Dashboard/Security";
import Profile from "../components/Dashboard/Profile";
import Followers from "../components/Dashboard/Followers";
import Followings from "../components/Dashboard/Followings";
import {Redirect} from "react-router-dom";

const Dashboard = (props) => {
    const [menu, setMenu] = useState(0);
    const handleMenuChange = (e) => {
        setMenu(parseInt(e.target.getAttribute("menu")));
        Array.from(document.querySelectorAll(".options>button")).forEach((item) => {
            item.classList.remove("active");
        });
        e.target.classList.add("active");
    }
    const logOut = () => {
        props.handleTokenChange("");
        return <Redirect to="/accounts/login" />;
    }

    if (!props.user.id) {
        return  <Redirect to="/accounts/login"/>;
    }
    return (
        <div className="dashboard">
            {!props.user.id && <Redirect to="/accounts/login" />}
            <div className="main">
                <div className="right">
                    <div className="header">
                        <h1>پیستپ</h1>
                    </div>
                    <Scrollbar rtl={true}>
                    <div className="options">
                        <button menu="0" onClick={handleMenuChange} className="active">مدیریت</button>
                        <button menu="1" onClick={handleMenuChange}>تنظیمات امنیتی</button>
                        <button menu="2" onClick={handleMenuChange}>دنبال کننده&zwnj;ها</button>
                        <button menu="3" onClick={handleMenuChange}>دنبال شده&zwnj;ها</button>
                        <button menu="4" onClick={handleMenuChange}>API</button>
                    </div>
                    </Scrollbar>
                    <button style={{color: "red"}} onClick={logOut}>خروج</button>
                </div>
                <div className="left">
                    <Scrollbar>
                        {menu === 0 && <Profile {...props} />}
                        {menu === 1 && <Security {...props} />}
                        {menu === 2 && <Followers {...props} />}
                        {menu === 3 && <Followings {...props} />}
                    </Scrollbar>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;