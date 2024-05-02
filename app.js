const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { engine } = require('express-handlebars')
const routes = require('./routes')

app.engine('hbs', engine({ extname: 'hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))

app.use(routes)
app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`)
})
