import "../styles/viewpaste.css";
import "../styles/markdown.css";
import "../styles/markdown-dark.css";
import {Scrollbar} from "react-scrollbars-custom";
import Codemirror from "react-codemirror";
import converter from "html-to-markdown";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";

const ViewPaste = (props) => {
    const [paste, setPaste] = useState({});
    const [code, setCode] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [isLiked, setLiked] = useState(false);
    const [comment, setComment] = useState("");
    const [menu, setMenu] = useState("newcomment");
    const [readme, setReadme] = useState("");
    const [shortDescription, setShortDescription] = useState("");

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };
    const commentSubmit = (e) => {
        e.preventDefault();
        if (!comment) {
            const textarea = document.querySelector(".comments>.new-comment>textarea");
            textarea.style.border = "1px solid red";
            return;
        }
    }
    const {id} = useParams();
    const options = {
        lineNumbers: true,
        tabSize: 4,
    };
    if (paste.language) {
        require(`codemirror/mode/${paste.language.slug}/${paste.language.slug}`);
        options.mode = paste.language.slug;
    }
    if (props.currentMode === "light") {
        require("codemirror/theme/neo.css");
        options['theme'] = "neo";
    } else {
        require("codemirror/theme/ayu-mirage.css");
        options['theme'] = "ayu-mirage";
    }
    useEffect(() => {
        const getPaste = async () => {
            const result = await props.fetchPaste({
                id: id,
                isRaw: true
            })
            setLiked(result.liked)
            setPaste(result);
        };
        getPaste();
    }, []);
    if (redirect) {
        return <Redirect to={`/pastes/view/${paste.paste.name}`}/>
    }
    if (paste.paste && paste.user.id === props.currentUser.id) {
        if (!code || !readme) {
            setCode(paste.paste.content);
            setReadme(paste.paste.readme);
        }
        return (
            <div className="viewpaste">
                <div className="viewpaste_header">
                    <div className="paste_header">
                        <h1>{paste.paste.title || "تایتل پیست"}</h1>
                        <img
                            width="24"
                            height="24"
                            src={isLiked ? "/images/heart-fill.svg" : "/images/heart.svg"}
                            onClick={async () => {
                                const result = await props.pasteLikeToggle(paste.paste.id);
                                if (result.message === "successfully disliked paste.") {
                                    setLiked(false);
                                } else if (result.id) {
                                    setLiked(true);
                                }
                            }}
                            alt=""
                        />
                    </div>
                    <div className="user">
                        <img
                            src={paste.user.avatar ? `${props.backend}/avatars/${paste.user.avatar}` : "/images/guest.jpg"}
                            alt={paste.user.username}/>
                        <h1>{paste.user.persianUsername || paste.user.username}</h1>
                    </div>
                </div>
                <div className="content">
                    <div className="comments">
                        {menu === "newcomment" ? <form className="new-comment" onSubmit={commentSubmit}>
                            <div className="new-comment-header">
                                <h1>نظر جدید</h1>
                                <div className="submit">
                                    <button type="button" onClick={() => {
                                        setMenu("comments");
                                    }}>نظرات
                                    </button>
                                </div>
                            </div>
                            <textarea type="text" value={comment} onChange={handleCommentChange}
                                      placeholder="متن نظر"></textarea>
                            <div className="submit">
                                <button type="submit">ثبت نظر</button>
                            </div>
                        </form> : <Scrollbar>
                            <div className="new-comment-button">
                                <div className="submit">
                                    <button onClick={() => {
                                        setMenu("newcomment");
                                    }}>نظر جدید
                                    </button>
                                </div>
                            </div>
                            <div className="comment">
                                <div className="comment-header">
                                    <img
                                        src={paste.user.avatar ? `${props.backend}/avatars/${paste.user.avatar}` : "/images/guest.jpg"}
                                        alt={paste.user.username}/>
                                    <h3>{paste.user.persianUsername || paste.user.username}</h3>
                                </div>
                                <div className="comment-content">
                                    پرنده میگیریمو میرینیم تو وبسایت ها
                                </div>
                            </div>

                        </Scrollbar>}
                    </div>
                    <div className="code">
                        <Codemirror className="code" value={code} onChange={(newcode) => {
                            setCode(newcode);
                        }} options={options}/>
                    </div>
                </div>
                <div className="field">
                    <input type="text" value={shortDescription} placeholder="فاقد توضیحات" onChange={(e) => {
                        setShortDescription(e.target.value);
                    }}/>
                </div>
                <Codemirror className="code" value={readme} onChange={(newcode) => {
                    setReadme(newcode);
                }} options={options}/>
                <div className="submit">
                    <button onClick={async () => {
                        if (code && readme) {
                            const result = await props.fetchUpdatePaste({
                                id: paste.paste.id,
                                content: code,
                                readme: readme,
                                shortDescription: shortDescription
                            })
                            if (result.message === "Paste successfully updated.") {
                                setRedirect(true);
                            }
                        }
                    }}>ثبت تغییرات
                    </button>
                </div>
            </div>
        );
    }
    return <h1>not found</h1>
};

export default ViewPaste