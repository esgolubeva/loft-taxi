module.exports = {
	roots: ["<rootDir>/src"],
	transform: {
		"^.+\\.(js|jsx)?$": "babel-jest"
	},
	setupFilesAfterEnv: [
		"<rootDir>/jest.setup.js",
		"@testing-library/jest-dom/extend-expect"
	],
	verbose: true,
	collectCoverage: true,
	moduleNameMapper: {
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/__mocks__/fileMock.js",
		"\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
	}
};
