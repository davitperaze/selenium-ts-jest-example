const isCI = process.env.CI === 'true';

const reporters = [
    "default"
];

if (isCI) {
    reporters.push(['jest-junit', { outputDirectory: 'reports', outputName: 'report.xml' }]);
} else {
    reporters.push(["jest-html-reporter", {
        "pageTitle": "Test Report",
        "outputPath": "./test-report/index.html"
    }]);
}

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ["**/__tests__/**/*.test.ts"],
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.json',
            },
        ],
    },
    setupFilesAfterEnv: [],
    reporters: reporters
};
