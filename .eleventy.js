const { DateTime } = require('luxon')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const markdownItCheckbox = require('markdown-it-checkbox')
const inspect = require('util').inspect

module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData('css', require('./_data/css.json'))

  eleventyConfig.addFilter(
    'debug',
    (content) => `<pre>${inspect(content)}</pre>`
  )

  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addPassthroughCopy('./src/assets')

  eleventyConfig.addPassthroughCopy({ './google/*': '/' })

  eleventyConfig.addFilter('postDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
  })

  eleventyConfig.addShortcode('year', () => {
    const year = new Date().getFullYear()
    return `${year}`
  })

  eleventyConfig.addCollection('portfolio', function (collection) {
    return collection
      .getFilteredByGlob('src/portfolio/*.md')
      .filter((x) => !x.data.hidden)
      .sort((a, b) => a.data.position - b.data.position)
  })

  let md = markdownIt({
    html: true,
  }).use(markdownItCheckbox)

  md.render('[ ] unchecked')
  md.render('[x] checked')

  eleventyConfig.setLibrary('md', md)

  eleventyConfig.addDataExtension('json', (contents) => JSON.parse(contents))

  eleventyConfig.on('eleventy.before', () => {
    console.log('Global Data:', require('./_data/css.json'))
  })

  return {
    dir: {
      input: 'src',
      output: './_site',
      data: './_data', // Explicitly specify data directory
    },
  }
}
