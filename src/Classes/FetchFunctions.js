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
			method: "POSt",
		});
		return result;
	};
	pasteUpdate = async (body) => {
		const result = await this.fetch({
			url: this.fetchRoutes.updatePaste(),
			body: body,
			method: "PUT",
		});
	};
}
export default FetchFunctions;
