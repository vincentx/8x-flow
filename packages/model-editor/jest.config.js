module.exports = {
    testMatch: [
        "**/test/unit/**/*.test.[jt]s?(x)"
    ],
    moduleNameMapper: {
        "^.+\\.(css|less)$": '<rootDir>/test/unit/stub.css'
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,vue}',
        '!src/main.js',
        '!src/**/_*.js',
    ],
    preset: '@vue/cli-plugin-unit-jest'
}
