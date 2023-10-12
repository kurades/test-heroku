const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Character = require('./models/character')

const PORT = process.env.PORT || 5001

const url = 'mongodb://127.0.0.1:27017/street-fighters'

mongoose.connect(url, { useNewUrlParser: true })

const db = mongoose.connection

db.once('open', _ => {
console.log('Database connected:', url)
})
db.on('error', err => {
console.error('connection error:', err)
})

async function createCharacter() {

  const ryu = new Character ({
    name: 'akai',
    ultimate: 'punch'
  })

  const newChara = await ryu.save({isNew: true});
  console.log(newChara);
}

createCharacter()

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
