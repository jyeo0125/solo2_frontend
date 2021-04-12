const express = require('express')
const app = express()
const replaceInFile = require('replace-in-file')

const routesReport = require('rowdy-logger').begin(app)

const path = require('path')
const { async } = require('regenerator-runtime')


app.get('/', (req, res) => {
  const filepath = path.join(__dirname, 'index.html')
  res.sendFile(filepath)
})

app.get('/main.js',async (req, res) => {
  const filepath = path.join(__dirname, 'main.js')
  res.sendFile(filepath)

  if (process.env.NODE_ENV === 'production'){
    await replaceInFile({
    files: filepath,
    from:'http://localhos:3001',
    to:'https://solo2-backend.herokuapp.com'
})
  }
})

app.get('/style.css', (req, res) => {
  const filepath = path.join(__dirname, 'style.css')
  res.type('css').sendFile(filepath)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    routesReport.print()
})
