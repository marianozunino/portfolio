const autoprefixer = require("autoprefixer");
const purgeCSSPlugin = require("@fullhuman/postcss-purgecss").default;
const purgecss = purgeCSSPlugin({
  content: ["./hugo_stats.json"],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements;
    return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])];
  },

  safelist: [
    "dark",
    "fa-moon",
    "fa-sun",
    "back-to-top",
    "visible",
    "copy-code-button",
    "highlight",

    /^fa-/, // All Font Awesome classes
    /^portfolio-/, // All portfolio-related classes
    /^item-/, // All item-related classes
    /^source-/, // All source-related classes
  ],
});

module.exports = {
  plugins: [
    process.env.HUGO_ENVIRONMENT !== "development" ? purgecss : null,
    autoprefixer,
  ],
};
