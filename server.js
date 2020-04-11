// express to create and configure a server
const express = require('express')
const server = express()

// get database exported from db.js
const db = require('./db')

// configure static files (css | scripts | images)
server.use(express.static('public'))

// habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

//set nunjucks
const nunjucks = require('nunjucks')

// configure nunjucks
nunjucks.configure('views', {
    express: server,
    noCache: true
})

// ROUTES

// index | home
server.get('/', function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Database error")
        }

        const reversedIdeas = [...rows].reverse()
        let lastIdeas = []

        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)

            }
        }
        return res.render('index.html', { ideas: lastIdeas })
    })
})

server.post('/', function(req, res) {
    //inserir dados
    const query = `
        INSERT INTO ideas(
          image,
          title,
          category,
          description,
          link
        ) VALUES(?,?,?,?,?)
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("Database error")
        }

        return res.redirect('/ideias')
    })
})

// ideas
server.get('/ideias', function(req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Database error")
        }

        const reversedIdeas = [...rows].reverse()

        return res.render('ideias.html', { ideas: reversedIdeas })
    })
})

server.listen(3000)