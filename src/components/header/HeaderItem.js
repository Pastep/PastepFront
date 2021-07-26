import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HeaderItem = (props) => {
	return (
		<Link to={props.link} className={props.active ? "active" : ""}>
			{props.name}
		</Link>
	);
};

HeaderItem.propTypes = {
	name: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	active: PropTypes.bool,
};

HeaderItem.defaultProps = {
	active: false,
};

export default HeaderItem;
