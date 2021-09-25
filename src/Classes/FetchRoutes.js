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
}

export default FetchRoutes;
