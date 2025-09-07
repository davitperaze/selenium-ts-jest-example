const isCI = process.env.CI === 'true';

const reporters = [
    "default"
];

if (isCI) {
    reporters.push(['jest-junit', { outputDirectory: 'reports', outputName: 'report.xml' }]);
} else {
    reporters.push(["jest-html-reporters", {
        "publicPath": "./test-report/",
        "filename": "report.html",
        "darkTheme": true,
        "pageTitle": "Test Report"
    }]);
}

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ["**/__tests__/**/*.test.ts"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    reporters: reporters
};
