import '../styles/global/nav.css'
import bell from '../images/bell.svg'
import search from '../images/search.svg'

function Nav() {
    return(
        <div className='navbar'>
            <div className='navbar-right'>
                <a href="#">خانه</a>
                 <a href="#">محبوب ترین ها</a>
                 <a href="#">تیم ها</a>
                 <a href="#">سازندگان</a>
            </div>
            <div className='navbar-left'>
                <a className='nav-button' href="#">پیست جدید</a>
                <img width='49px' height='49px' src="https://cdn.discordapp.com/avatars/721402598326009988/c63434b7f1ba424088f802f3252a02d5.png?size=1024"></img>
                <img style={{ transform:'translateY(1px)' }} width="24px" height='24px' src={bell}></img>
                <div className='nav-search-box'>
                    <img width='20px' height='20px' src={search}></img>
                    <input placeholder='چیزی را تایپ کنید'></input>
                </div>
            </div>
        </div>
    )
}

export default Nav;

