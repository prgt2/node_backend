const express = require('express') //zasysa moduł express.js
const app = express() //przechowuje moduł w const, zeby nie trzeba było dużo pisać
const path = require('path')
const port = process.env.PORT || 3000 //dokładnie, słucha zmiennej środowiskowej, jesli brak słucha na 3000
const kooperanter = [
    {id: 1, name: 'kooperant1', order: []},
    {id: 2, name: 'kooperant2', order: []},
    {id: 3, name: 'kooperant3', order: []}
]
const produkta = [
    {id: 1, nazwa: 'marchew', jednostka: 'kg', cena: 5, waluta: 'zł'},
    {id: 2, nazwa: 'ziemniak', jednostka: 'kg', cena: 4, waluta: 'zł'},
    {id: 3, nazwa: 'placek', jednostka: 'szt', cena: 8, waluta: 'zł'}

]
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
    console.log(__dirname)
})
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, "script.js"))
})
app.get('/api/kooperanci', (req, res) => {
    res.send(kooperanter)
})
app.get('/api/kooperanci/:id', (req, res) => {
    const osoba = kooperanter.find(i => i.id === parseInt(req.params.id))
    if (!osoba) res.status(404).send('nie ma takiego kooperanta')
    res.send(osoba)
})
app.get('/api/produkta', (req, res) => {
    res.send(produkta)
})
app.get('/api/produkta/:id', (req, res) => {
    const produkt = produkta.find(i => i.id === parseInt(req.params.id))
    if (!produkt) res.status(404).send('nie ma takiego kooperanta')
    res.send(produkt)
})
app.listen(port)