import "../../styles/edit.css";

const Edit = (props) => {
    return (
        <div className="editable-area">
            <svg fill="var(--text)" enableBackground="new 0 0 45 45" height="45" viewBox="0 0 45 45" width="45"
                 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <style>.a{"fill:#231F20;"}</style>
                <rect height="23" transform="matrix(-0.7071 -0.7072 0.7072 -0.7071 38.2666 48.6029)" width="11" x="23.7"
                      y="4.9" className="a"/>
                <path d="M44.1 3.7l-2.5-2.5c-1.4-1.4-3.6-1.4-5 0L34.9 2.9l7.8 7.8 1.7-1.7C45.8 7.6 45.5 5.1 44.1 3.7z"
                      className="a"/>
                <polygon points="16 22.2 16 30 23.2 30 " className="a"/>
                <path
                    d="M29 40H5V16h12.6l5-5H3.5C1.8 11 0 11.8 0 13.5v28C0 43.2 1.8 45 3.5 45h28c1.7 0 2.5-1.8 2.5-3.5V23.6l-5 5V40z"
                    className="a"/>
            </svg>
            <input type={props.type} onChange={props.handler} value={props.value} placeholder={props.placeHolder}/>
        </div>
    );
};

export default Edit;
