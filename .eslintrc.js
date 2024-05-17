module.exports = {
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "prettier",
    "prettier/vue",
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
