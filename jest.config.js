module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.+(ts|tsx|js)"]
};
