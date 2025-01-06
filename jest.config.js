module.exports = {
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
	testEnvironment: 'jsdom',
	testMatch: ['<rootDir>/src/**/__tests__/**/*.test.js'],
	moduleNameMapper: {
		'\\.(css|less)$': 'identity-obj-proxy',
	},
};
