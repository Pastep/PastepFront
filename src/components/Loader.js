const Loader = () => {
    return (
        <div className="loading">
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: "auto", background: "transparent", display: "block", shapeRendering: "auto", animationPlayState: "running", animationDelay: "0"}} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <g style={{animationPlayState: "running", animationDelay: "0s"}}>
                <circle cx="60" cy="50" r="4" fill="#e15b64" style={{animationPlayState: "running", animationDelay: "0s"}}>
                    <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.67s" style={{animationPlayState: "running", animationDelay: "0s"}} />
                    <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.67s" style={{animationPlayState: "running", animationDelay: "0s"}} />
                </circle>
                <circle cx="60" cy="50" r="4" fill="#e15b64" style={{animationPlayState: "running", animationDelay: "0s"}}>
                    <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.33s" style={{animationPlayState: "running", animationDelay: "0s"}}/>
                    <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.33s" style={{animationPlayState: "running", animationDelay: "0s"}}/>
                </circle>
                <circle cx="60" cy="50" r="4" fill="#e15b64" style={{animationPlayState: "running", animationDelay: "0s"}}>
                    <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="0s" style={{animationPlayState: "running", animationDelay: "0s"}} />
                    <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="0s" style={{animationPlayState: "running", animationDelay: "0s"}} />
                </circle>
            </g><g transform="translate(-15 0)" style={{animationPlayState: "running", animationDelay: "0s"}}>
            <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#f8b26a" transform="rotate(90 50 50)" style={{animationPlayState: "running", animationDelay: "0s"}}/>
            <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#f8b26a" style={{animationPlayState: "running", animationDelay: "0s"}}>
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;45 50 50;0 50 50" keyTimes="0;0.5;1" style={{animationPlayState: "running", animationDelay: "0s"}}/>
            </path>
            <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#f8b26a" style={{animationPlayState: "running", animationDelay: "0s"}}>
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;-45 50 50;0 50 50" keyTimes="0;0.5;1" style={{animationPlayState: "running", animationDelay: "0s"}}/>
            </path>
        </g></svg></div>
    );
}

export default Loader;