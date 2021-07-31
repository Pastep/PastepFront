import "../styles/new-paste.css";
import "../styles/header.scss";
import {Redirect} from "react-router-dom";
import {useState, useRef, useEffect} from "react";

import Codemirror from "react-codemirror";
import "../../node_modules/codemirror/lib/codemirror.css";

const NewPaste = (props) => {
    const [code, setCode] = useState("");
    const codeRef = useRef();
    const optionsRef = useRef();
    const [readme, setReadme] = useState(`*Read me*\n**Type Something**`);
    const [language, setLanguage] = useState("javascript");
    const [languages, setLanguages] = useState([]);
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [mode, setMode] = useState(0);
    const [password, setPassword] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [redirect, setRedirect] = useState([false]);
    useEffect(() => {
        const getLanguages = async () => {
            const fetchedLanguages = await props.fetchLanguages();
            setLanguages(fetchedLanguages);
        }
        getLanguages();
    }, [])
    if (!props.user.id) {
        return <Redirect to="/accounts/login"/>;
    }

    const languageChange = (e) => {
        setLanguage(e.target.value)
    }
    try {
        require(`codemirror/mode/${language}/${language}`);
    } catch (e) {
        require(`codemirror/mode/javascript/javascript`);
    }

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

    const next = async (e) => {
        let isOk = true;
        document.getElementById("name").style.border = "";
        document.getElementById("password").style.border = "";
        document.getElementById("shortDescription").style.border = "";

        if (!code) {
            isOk = false;
            document.querySelector(".ReactCodeMirror.code>div").style.border = "1px solid red";
            window.scrollTo({ behavior: 'smooth', top: codeRef.current.offsetTop });
        } else if (!name) {
            isOk = false;
            document.getElementById("name").style.border = "1px solid red";
            window.scrollTo({behavior: "smooth", top: optionsRef.current.offsetTop});
        } else if (!password && mode === 2) {
            isOk = false;
            document.getElementById("password").style.border = "1px solid red";
            window.scrollTo({behavior: "smooth", top: optionsRef.current.offsetTop});
        } else if (!shortDescription) {
            isOk = false;
            document.getElementById("shortDescription").style.border = "1px solid red";
            window.scrollTo({behavior: "smooth", top: optionsRef.current.offsetTop});
        }
        if (isOk){
            const body = {
                title: name,
                content: code,
                name: link,
                mode: mode,
                language: language,
                shortDescription: shortDescription,
            };
            if (readme) {
                body.readme = readme;
            }
            if (password) {
                body.password = password;
            }
            let result = await props.fetchPasteCreate(body);
            if (result.message) {
                body.name = Math.random().toString(36).substring(7);
                result = await props.fetchPasteCreate(body);
            }
            if (result.name) {
                setRedirect([true, result.name]);
            }
        }
    }

    return (
        <div className="new-paste">
            {redirect[0] && <Redirect to={"/pastes/" + redirect[1]} />}
            <h1 id="code" ref={codeRef}>پیست جدید</h1>
            <Codemirror className="code" value={code} onChange={(newcode) => {
                setCode(newcode);
                document.querySelector(".ReactCodeMirror.code>div").style.border = "";
            }} options={options}
                        defaultValue="Type something"/>
            <div ref={optionsRef} className="options" style={{flexDirection: "row"}}>
                <div className="option">
                    <h1>عنوان پیست <span>(Pastep.com/pastes/{link})</span></h1>
                    <input id="name" required type="text" placeholder="عنوان پیست را تایپ کنید" value={name} onChange={(e) => {
                        if (name !== "" && e.target.value.replace(/[^A-Za-z0-9]/g, '') === "") {
                            setLink(Math.random().toString(36).substring(7));
                        } else {
                            setLink(e.target.value.replace(/[^A-Za-z0-9]/g, ''));
                        }
                        setName(e.target.value);
                    }}/>
                </div>
                <div className="option">
                    <h1>زبان پیست</h1>
                    <select onChange={languageChange}>
                        {languages.map((item) => {
                            return <option key={item.id} value={item.slug}>{item.persianName || item.name}</option>
                        })}
                    </select>
                </div>
                <div className="option">
                    <h1>حالت پیست</h1>
                    <select onChange={(e) => {
                        setMode(parseInt(e.target.value));
                    }}>
                        <option value="0">قابل دسترسی برای عموم</option>
                        <option value="1">مخفی</option>
                        <option value="2">محافظت شده با پسورد</option>
                    </select>
                </div>
                <div className="option">
                    <h1>پسورد پیست</h1>
                    <input id="password" disabled={mode === 2 ? false : true} value={password} type="password" placeholder="در صورت انتخاب حالت محافظت شده" onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>
                </div>
            </div>
            <div id="option2" className="options" style={{flexDirection: "row"}}>
                <div className="option" style={{width: "100%"}}>
                    <h1>توضیحات پیست</h1>
                    <input id="shortDescription" type="text" placeholder="توضیحات کوچکی از پیست" value={shortDescription} onChange={(e) => {
                        setShortDescription(e.target.value);
                    }}/>
                </div>
            </div>
            <div className="about" id="readme">
                <h1>درباره پیست<span className="text-muted" style={{fontSize: 14, marginRight: "10px"}}>(قابلیت ساپورت md)</span>
                </h1>
                <Codemirror className="code" value={readme} onChange={setReadme} options={options}/>
            </div>
            <div className="submit">
                <button className="features__new-paste" style={{width: "max-content"}} onClick={next}>ساخت پیست</button>
            </div>
        </div>
    );
};

export default NewPaste;
