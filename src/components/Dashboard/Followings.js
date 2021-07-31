import {useEffect, useState} from "react";
import "../../styles/followers.css"
import {Link} from "react-router-dom";

const Followings = (props) => {
    const [Followings, setFollowings] = useState([]);
    useEffect(() => {
        const fetchStuff = async () => {
            const fetchedFollowings = await props.fetchFollowings(props.user.id);
            setFollowings(fetchedFollowings);
        }
        fetchStuff();
    }, [])
    if (Followings.length) {
        return <div className="followers">
            {Followings.map((item) => {
                return <div className="follower" key={item.id}>
                    <img src={item.avatar ? `${props.backend}/avatars/${item.avatar}` : "/images/guest.jpg"} alt={item.username}/>
                    <h3>{item.persianUsername || item.username}</h3>
                    <div className="submit">
                        <Link to={`/accounts/view/${item.username}`}>مشاهده</Link>
                    </div>
                </div>
            })}
        </div>;
    } else {
        return <h1 style={{padding: "20px"}}>کسی را دنبال نکرده اید</h1>
    }
};

export default Followings;