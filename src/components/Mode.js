const Mode = (props) => {
	return (
		<div className="mode-toggle" onClick={props.toggleMode}>
			{props.currentMode === "dark" ? (
				<svg
					stroke="currentColor"
					fill="currentColor"
					viewBox="0 0 24 24"
					height="28"
					width="28"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g>
						<path fill="none" d="M0 0h24v24H0z"></path>
						<path d="M8 12h2v2H4v-2h2a6 6 0 1 1 6 6v-2a4 4 0 1 0-4-4zm-2 8h9v2H6v-2zm-4-4h8v2H2v-2zm9-15h2v3h-2V1zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3z"></path>
					</g>
				</svg>
			) : (
				<svg
					stroke="currentColor"
					fill="currentColor"
					viewBox="0 0 24 24"
					height="28"
					width="28"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g>
						<path fill="none" d="M0 0h24v24H0z"></path>
						<path
							fillRule="nonzero"
							d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z"
						></path>
					</g>
				</svg>
			)}
		</div>
	);
};

export default Mode;
