import "../styles/viewpaste.css";
import "../styles/markdown.css";
import "../styles/markdown-dark.css";
import {Scrollbar} from "react-scrollbars-custom";

import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {atomOneDark, vs} from "react-syntax-highlighter/dist/esm/styles/hljs";

const ViewPaste = (props) => {
    const [paste, setPaste] = useState({});
    const [isLiked, setLiked] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [menu, setMenu] = useState("newcomment");
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
    const {name} = useParams();
    useEffect(() => {
        const getPaste = async () => {
            const result = await props.fetchPaste({
                name: name,
            })
            setLiked(result.liked)
            setPaste(result);
            const fetchedComments = await props.fetchComments(result.paste.id);
            setComments(fetchedComments);
        };
        getPaste();
    }, []);
    if (paste.paste) {
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
                                <button type="submit" onClick={async () => {
                                    const result = await props.fetchCreateComment(paste.paste.id, comment);
                                    if (result.id) {
                                        setComments([...comments, {
                                            user: {
                                                id: props.user.id,
                                                username: props.user.username,
                                                persianUsername: props.user.persianUsername,
                                                avatar: props.user.avatar
                                            },
                                            comment: {
                                                id: result.id,
                                                content: comment
                                            }
                                        }]);
                                        setMenu("comments");
                                    }
                                    }}>ثبت نظر</button>
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
                            {comments.map((item) => {
                                return <div key={item.comment.id} className="comment">
                                    <div className="comment-header">
                                        <img
                                            src={item.user.avatar ? `${props.backend}/avatars/${item.user.avatar}` : "/images/guest.jpg"}
                                            alt={item.user.username}/>
                                        <h3>{item.user.persianUsername || item.user.username}</h3>
                                    </div>
                                    <div className="comment-content">
                                        {item.comment.content}
                                    </div>
                                </div>
                            })}


                        </Scrollbar>}
                    </div>
                    <div className="code">
                        <div className="code__wrapper">
                            <SyntaxHighlighter
                                language={paste.language.slug}
                                style={props.currentMode === "light" ? vs : atomOneDark}
                                className="code__wrapper2"
                            >
                                {paste.paste.content || "console.log('not loaded yet');"}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                </div>
                <div className={`readme markdown-body${props.currentMode === "dark" ? "-dark" : ""}`}
                     dangerouslySetInnerHTML={{__html: paste.paste.readme}}>
                </div>
            </div>
        );
    }
    return <h1>not found</h1>
};

export default ViewPaste