const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const middlewareCheck = (req, res, next) => {
  const age = req.query.age
  if (age != '') {
    return next()
  }
  return res.redirect('/')
}
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public/'))

app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('index')
})
app.get(`/minor`, middlewareCheck, (req, res) => {
  age = req.query.age
  return res.render('minor', { age })
})
app.get('/major', middlewareCheck, (req, res) => {
  age = req.query.age
  return res.render('major', { age })
})
app.post('/check', middlewareCheck, (req, res) => {
  if (req.body.age >= 18) {
    return res.redirect('/major?age=' + req.body.age)
  } else {
    return res.redirect('/minor?age=' + req.body.age)
  }
})
app.listen(9999)
