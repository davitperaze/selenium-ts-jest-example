interface EnvironmentConfig {
    baseUrl: string;
    browser: string;
}

interface AppConfig {
    development: EnvironmentConfig;
    production: EnvironmentConfig;
    test: EnvironmentConfig;
    [key: string]: EnvironmentConfig;
}

const config: AppConfig = {
    development: {
        baseUrl: "http://localhost:8080/",
        browser: "chrome",
    },
    production: {
        baseUrl: "https://example.url/",
        browser: "chrome",
    },
    test: {
        baseUrl: "http://localhost:8080/",
        browser: "chrome",
    },
};

const currentEnv: string = process.env.NODE_ENV || "development";

const envConfig = config[currentEnv] || config.development;

const environmentConfig: EnvironmentConfig = { ...envConfig };

if (process.env.BASE_URL) {
    environmentConfig.baseUrl = process.env.BASE_URL;
}


export default environmentConfig;
