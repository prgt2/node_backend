const express = require('express') //zasysa moduł express.js
const app = express() //przechowuje moduł w const, zeby nie trzeba było dużo pisać
const path = require('path')
const port = process.env.PORT || 3000 //dokładnie, słucha zmiennej środowiskowej, jesli brak słucha na 3000

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
app.listen(port)