#!/usr/bin/env node
const express = require('express') //zasysa moduł express.js
const app = express() //przechowuje moduł w const, zeby nie trzeba było dużo pisać
const path = require('path')
const port = process.env.PORT || 3000 //dokładnie, słucha zmiennej środowiskowej, jesli brak słucha na 3000
let kooperanter = []
let produkta = []
function NeuesKooperant(name, order = [], id = kooperanter.length + 1) {
    this.id = id;
    this.name = name;
    this.order = order;
}
function NeuesFrukta(nazwa, cena, id = produkta.length + 1, jednostka = 'szt', waluta = 'zł') {
    this.nazwa = nazwa;
    this.cena = cena;
    this.id = id;
    this.jednostka = jednostka;
    this.waluta = waluta;
}
function createKooperant(name, order, id) {
    let obiektKoop = new NeuesKooperant(name, order, id)
    kooperanter.push(obiektKoop)
}
createKooperant('Włodek')
createKooperant('Zdzichu')
function createFrukt(nazwa, cena, id, jednostka, waluta) {
    let obiektFrukt = new NeuesFrukta(nazwa, cena, id, jednostka, waluta)
    produkta.push(obiektFrukt)
}
createFrukt('Marchew',5)
createFrukt('Ziemniaki',3, 'kg')
app.get('/', (req, res) => { //zastapic uniwersalna funkcja z domyslnymi parametrami
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