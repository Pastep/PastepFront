import "../styles/new-paste.css";
import "../styles/header.scss";
import {Redirect} from "react-router-dom";
import {useState} from "react";

import Codemirror from "react-codemirror";
import "../../node_modules/codemirror/lib/codemirror.css";

const NewPaste = (props) => {
    const [code, setCode] = useState("");
    const [readme, setReadme] = useState("");
    const [language, setLanguage] = useState("javascript");
    if (!props.user.id) {
        return <Redirect to="/accounts/login"/>;
    }

    const languageChange = (e) => {
        setLanguage(e.target.value)
    }

    require(`codemirror/mode/${language}/${language}`);
    const options = {
        lineNumbers: true,
        mode: language,
        tabSize: 4,
    };

    if (props.currentMode === "light") {
        require("codemirror/theme/neo.css");
        options['theme'] = "neo";
    } else {
        require("codemirror/theme/ayu-mirage.css");
        options['theme'] = "ayu-mirage";
    }

    return (
        <div className="new-paste">
            <h1>پیست جدید</h1>
            <Codemirror className="code" value={code} onChange={setCode} options={options}
                        defaultValue="Type something"/>
            <div className="options" style={{flexDirection: "row"}}>
                <div className="option">
                    <h1>عنوان پیست</h1>
                    <input type="text" placeholder="عنوان پیست را تایپ کنید"/>
                </div>
                <div className="option">
                    <h1>زبان پیست</h1>
                    <select onChange={languageChange}>
                        <option value="javascript">جاوا اسکریپت</option>
                        <option value="python">پایتون</option>
                    </select>
                </div>
                <div className="option">
                    <h1>حالت پیست</h1>
                    <select>
                        <option value="public">قابل دسترسی برای عموم</option>
                        <option value="private">مخفی</option>
                        <option value="passwordProtected">محافظت شده با پسورد</option>
                    </select>
                </div>
                <div className="option">
                    <h1>پسورد پیست</h1>
                    <input type="text" placeholder="در صورت انتخاب حالت محافظت شده"/>
                </div>
            </div>
            <div className="about">
                <h1>درباره پیست<span className="text-muted" style={{fontSize: 14, marginRight: "10px"}}>(قابلیت ساپورت md)</span></h1>
                <Codemirror className="code" value={readme} onChange={setReadme} options={options}
                            defaultValue={`*Read me*\n**Type Someting**`}/>
            </div>
            <div className="submit">
                <button className="features__new-paste" style={{width: "max-content"}}>ساخت پیست</button>
            </div>
        </div>
    );
};

export default NewPaste;
