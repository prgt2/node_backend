const express = require('express') //zasysa moduł express.js
const app = express() //przechowuje moduł w const, zeby nie trzeba było dużo pisać
const path = require('path')
const port = process.env.PORT || 3000 //dokładnie, słucha zmiennej środowiskowej, jesli brak słucha na 3000
const mysql = require('mysql');
const connectio = mysql.createConnection({
    host: "mintR540",
    user: "einverv",
    password: "yaq",
    database: "koop"
})

connectio.connect((err) => {
    if (err) {
        console.log(err)
        //throw err //wypierdala błąd i terminuje funkcję, ale czemuś nie dizała
    }
    console.log('ecce connectio')
    connectio.query('select * from kooperant;', (err, results, fields) => {
        if (err) console.log(err)
        console.log(results)
    })
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "HTML/index.html"))
})
app.get('/CSS/tabela.css', (req, res) => {
    res.sendFile(path.join(__dirname, "CSS/tabela.css"))
})
app.get('/CSS/glowny.css', (req, res) => {
    res.sendFile(path.join(__dirname, "CSS/glowny.css"))
})
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, "script.js"))
})
app.get('/api/koop', (req, res) => {
    console.log('requested')
    res.send('some data')
})
app.listen(port)