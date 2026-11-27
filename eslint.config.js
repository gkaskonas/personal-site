import prettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  { ignores: ["dist/", ".sst/", ".astro/"] },
  prettierRecommended,
];
