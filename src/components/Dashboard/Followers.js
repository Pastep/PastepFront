import {useEffect, useState} from "react";
import "../../styles/followers.css"
import {Link} from "react-router-dom";

const Followers = (props) => {
    const [followers, setFollowers] = useState([]);
    useEffect(() => {
        const fetchStuff = async () => {
            const fetchedFollowers = await props.fetchFollowers(props.user.id);
            setFollowers(fetchedFollowers);
        }
        fetchStuff();
    }, [])
    if (followers.length) {
        return <div className="followers">
            {followers.map((item) => {
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
        return <h1 style={{padding: "20px"}}>دنبال کننده ندارید.</h1>
    }
};

export default Followers;