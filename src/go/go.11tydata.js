module.exports = {
  permalink: '/go/{% if goPackage %}{{ goPackage.name }}{% endif %}/index.html',
  eleventyExcludeFromCollections: true,
}
