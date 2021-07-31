import "../styles/home.scss";
import Paste from "../components/Paste";
import {useEffect, useState} from "react";

const Home = (props) => {
    const [pastes, setPastes] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const getPastes = async () => {
            setPastes(Array.from(await props.fetchPastes(25)));
            setLoading(false);
        }
        getPastes();
    }, []);
    return (
        <div>
            <div className="flex justify-center">
                <div className="code-type__wrapper flex">
                    <div className="code-type__item selected">کد های کوتاه</div>
                    <div className="code-type__item">کد های برگزیده</div>
                    <div className="code-type__item">فرانت اند</div>
                    <div className="code-type__item">بک اند</div>
                </div>
            </div>
            <div className="pastes">
                <div className="pastes__wrapper">
                    {isLoading ? <h1>در حال بارگزاری...</h1> : pastes.map((item) => {
                        let paste = item.paste;
                        let user = item.user;
                        let language = item.language;
                        return <Paste
                            key={paste.id}
                            id={paste.id}
                            {...props}
                            userName={user.persianUsername ? user.persianUsername : user.username}
                            userLocation={language.persianName || language.name}
                            profilePic={user.avatar ? `${props.backend}/avatars/${user.avatar}` : "/images/guest.jpg"}
                            language={language.slug}
                            code={paste.content.length > 150 ? paste.content.substr(0, 150) + "..." : paste.content}
                            title={paste.title}
                            description={paste.shortDescription ? paste.shortDescription : "فاقد توضیحات"}
                            name={paste.name}
                            liked={item.liked}
                        />
                    })}
                </div>

            </div>
        </div>
    );
};

export default Home;
