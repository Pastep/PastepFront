import FetchRoutes from "./FetchRoutes";
class FetchFunctions {
	constructor({ defaultHeaders, fetchRoutes = new FetchRoutes() }) {
		this.defaultHeaders = defaultHeaders;
		this.fetchRoutes = fetchRoutes;
	}
	fetch = async ({ url, body, headers = {}, method = "GET" }) => {
		const response = await fetch(url, {
			headers: {
				...this.defaultHeaders,
				...headers,
			},
			method: method,
			body: body ? JSON.stringify(body) : undefined,
		});
		const data = await response.json();
		return { response, data };
	};
	createComment = async ({ paste, content }) => {
		const result = await this.fetch({
			url: this.fetchRoutes.createComment(),
			body: {
				paste,
				content,
			},
			method: "POST",
		});
		return result;
	};
	comments = async (pasteId) => {
		const result = await this.fetch({
			url: this.fetchRoutes.comments(pasteId),
		});
		return result;
	};
	deleteComment = async (id) => {
		const result = await this.fetch({
			url: this.fetchRoutes.deleteComment(),
			body: {
				id,
			},
			method: "DELETE",
		});
		return result;
	};
	passwordReset = async (body) => {
		const result = await this.fetch({
			url: this.fetchRoutes.passwordReset(),
			body: body,
			method: "POST",
		});
		return result;
	};
	pasteUpdate = async (body) => {
		const result = await this.fetch({
			url: this.fetchRoutes.updatePaste(),
			body: body,
			method: "PUT",
		});
		return result;
	};
	followers = async (user) => {
		const result = await this.fetch({
			url: this.fetchRoutes.followers(user),
		});
		return result;
	};
	followings = async (user) => {
		const result = await this.fetch({
			url: this.fetchRoutes.followings(user),
		});
		return result;
	};
	languages = async () => {
		const result = await this.fetch({
			url: this.fetchRoutes.languages(),
		});
		return result;
	};
	toggleFollow = async (target) => {
		const result = await this.fetch({
			url: this.fetchRoutes.toggleFollow(),
			body: { target },
			method: "POST",
		});
		return result;
	};
	deletePaste = async (id) => {
		const result = await this.fetch({
			url: this.fetchRoutes.deletePaste(),
			body: { id },
			method: "DELETE",
		});
		return result;
	};
	paste = async ({ id, name, password, isRaw = false }) => {
		const result = await this.fetch({
			url: this.fetchRoutes.paste({ id, name, password, isRaw }),
			method: "GET",
		});
		return result;
	};
	createPaste = async (body) => {
		const result = await this.fetch({
			url: this.fetchRoutes.createPaste(),
			body: body,
			method: "POST",
		});
		return result;
	};
	user = async ({ name, value }) => {
		const result = await this.fetch({
			url: this.fetchRoutes.user({ name, value }),
		});
		return result;
	};
	avatarUpdate = async (file) => {
		const formData = new FormData();
		formData.append("avatar", file, "profile.png");
		const response = await fetch(this.fetchRoutes.avatarUpdate(), {
			method: "POST",
			...this.defaultHeaders,
			body: formData,
		});
		const data = await response.json();
		return { response, data };
	};
	userUpdate = async (body) => {
		const result = await this.fetch({
			url: this.fetchRoutes.userUpdate(),
			body: body,
			method: "PUT",
		});
		return result;
	};
	register = async ({ username, persianUsername, email, password }) => {
		const result = await this.fetch({
			url: this.fetchRoutes.register(),
			body: { username, persianUsername, email, password },
			method: "POST",
		});
		return result;
	};
	searchPaste = async ({
		limit,
		shuffle = "no",
		latest = "no",
		title,
		user,
	}) => {
		const result = await this.fetch({
			url: this.fetchRoutes.searchPaste({
				limit,
				shuffle,
				latest,
				title,
				user,
			}),
		});
		return result;
	};
	pastes = async ({ limit, shuffle = "no", latest = "no" }) => {
		const result = await this.fetch({
			url: this.fetchRoutes.pastes({ limit, shuffle, latest }),
		});
		return result;
	};
	trendingPastes = async (limit) => {
		const result = await this.fetch({
			url: this.fetchRoutes.trendingPastes(limit),
		});
		return result;
	};
}
export default FetchFunctions;
