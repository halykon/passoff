import 'colors'
import fs from 'fs'
import { pascalCase } from 'change-case'
import path from 'path'

const componentName = pascalCase(process.argv[2] ?? '')

if (!componentName) {
  console.error('Please supply a valid component name'.red)
  process.exit(1)
}

console.log(`Creating Component Templates with name: ${componentName}`)

const componentDirectory = path.join(__dirname, `/../stories/${componentName}`)

if (fs.existsSync(componentDirectory)) {
  console.error(`Component ${componentName} already exists. Trying to add missing files.`.yellow)
} else {
  fs.mkdirSync(componentDirectory)
  console.info('created folder ', componentDirectory)
}

const templates = fs.readdirSync(path.join(__dirname, '/templates')).map(fileName => {
  const content = fs.readFileSync(path.join(__dirname, 'templates', fileName), 'utf8')

  return {
    fileName: fileName.replaceAll('Template', componentName),
    content: content.replaceAll('Template', componentName),
  }
})

let fileCount = 0

templates.forEach(template => {
  const templatePath = `${componentDirectory}/${template.fileName}`
  if (!fs.existsSync(templatePath)) {
    fs.writeFileSync(templatePath, template.content)
    console.info('added file'.green, templatePath)
    fileCount++
  }
})

console.log('Successfully created', fileCount, 'files under:', componentDirectory.green)
