class FetchRoutes {
	constructor({ backend }) {
		this.backend = backend;
	}
	query = (parameters) => {
		return Object.keys(parameters)
			.map((item) => {
				return `${item}=${parameters[item]}`;
			})
			.join("&");
	};
	// Comments
	createComment = () => {
		return `${this.backend}/pastes/comments/create`;
	};
	comments = (pasteId) => {
		return `${this.backend}/pastes/comments/all?${this.query({
			paste: pasteId,
		})}`;
	};
	deleteComment = () => {
		return `${this.backend}/pastes/comments/delete`;
	};
	// Password
	passwordReset = () => {
		return `${this.backend}/accounts/password/reset`;
	};

	// Paste
	updatePaste = () => {
		return `${this.backend}/pastes/update`;
	};
	deletePaste = () => {
		return `${this.backend}/pastes/delete`;
	};
	paste = ({ id, name, password, isRaw = false }) => {
		return `${this.backend}/pastes/read?${this.query({
			isRaw: isRaw ? "yes" : "no",
			password: password,
		})}&${id ? `id=${id}` : `name=${name}`}`;
	};
	pastes = ({ limit, shuffle = "no", latest = "no" }) => {
		return `${this.backend}/pastes/all?${this.query({
			limit,
			shuffle,
			latest,
		})}`;
	};
	trendingPastes = (limit) => {
		return `${this.backend}/pastes/trending?${this.query({ limit })}`;
	};
	createPaste = () => {
		return `${this.backend}/pastes/create`;
	};
	searchPaste = ({ limit, shuffle = "no", latest = "no", title, user }) => {
		return `${this.backend}/pastes/search?${this.query({
			title,
			shuffle,
			latest,
			user,
		})}`;
	};
	// User
	user = ({ name, value }) => {
		return `${this.backend}/accounts/get?${name}=${value}`;
	};
	followers = (user) => {
		return `${this.backend}/accounts/people/followers?${this.query({ user })}`;
	};
	followings = (user) => {
		return `${this.backend}/accounts/people/followings?${this.query({ user })}`;
	};
	toggleFollow = () => {
		return `${this.backend}/accounts/people/toggleFollow`;
	};
	avatarUpdate = () => {
		return `${this.backend}/accounts/avatar`;
	};
	userUpdate = () => {
		return `${this.backend}/accounts/update`;
	};
	register = () => {
		return `${this.backend}/accounts/create`;
	};
	// Language
	languages = () => {
		return `${this.backend}/languages/all`;
	};
}

export default FetchRoutes;
