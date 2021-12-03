const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

const app = express()
const port = 3000
//setting template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//seting static files
app.use(express.static('public'))

//routes setting
app.get('/', (req, res) => {
  res.render('index', { restauants: restaurantList.results })
})

app.get('/restauants/:restauant_id', (req, res) => {
  const restauant = restaurantList.results.find(restauant => restauant.id.toString() === req.params.restauant_id)

  res.render('show', { restauant: restauant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restauants = restaurantList.results.filter(restauant => {
    return restauant.name.toLowerCase().includes(keyword.toLowerCase()) || restauant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restauants: restauants, keyword: keyword })
})
//start and listen on Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})