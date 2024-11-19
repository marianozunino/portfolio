const fs = require('fs')
const path = require('path')
const md5 = require('md5')
const glob = require('glob')

const hashedPaths = Object.fromEntries(
  glob.sync('src/css/!(*-*).css').map((file) => {
    const filename = path.basename(file, '.css')
    const fileContents = fs.readFileSync(file)
    const hashedFilename = `css/${filename}-${md5(fileContents)}.css`
    // ensure dir exists
    fs.mkdirSync(path.join('_site', path.dirname(hashedFilename)), {
      recursive: true,
    })

    // Copy the original CSS file to the new location instead of renaming
    const newFilePath = path.join('_site', hashedFilename)
    fs.copyFileSync(file, newFilePath) // This keeps the original file and copies it to the _site folder

    return [filename, `/${hashedFilename}`]
  })
)

console.log(hashedPaths)

fs.writeFileSync(`_data/css.json`, JSON.stringify(hashedPaths))
