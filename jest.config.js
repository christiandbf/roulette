// eslint-disable-next-line no-undef
module.exports = {
	clearMocks: true,
	coverageDirectory: 'coverage',
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverageFrom: ['**/src/**/*.ts'],
	// Start from current coverage and increase over time
	coverageThreshold: {
		global: {
			statements: 14,
			branches: 0,
			lines: 14,
			functions: 1
		}
	},
	projects: ['./packages/api/jest.config.js', './packages/core/jest.config.js']
};
