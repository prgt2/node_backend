//PURE NODE.JS

/* const HTTP = require('http') //nie bibl, tylko moduł
HTTP.createServer((req, res) => { //tak, parametry zapytania i odpowiedzi, które są obiektami z właściwosciami jak url itp
    if (req.url === '/') { //tak, do strony głównej
        res.write('homepage') //metoda noda wysyłająca w odpowiedzi polecenie wpisania w dokument treść, dla przykładu homepage
        res.end()
    } else if (req.url === '/about') {
        res.write('about page')
        res.end()   
    } else {
        res.writeHead(404) //wpisuje nie do dokumentu, tylko do nagłówka odpowiedzi; przeglądarka wyświetli stronę 404 not found
        res.end()
    }
}).listen(3000, () => { //tak, port 3000 plus w konsoli że potwierdzenie, że serwer się postawił i słucha na porcie
    console.log('server started')
}) */

//WITH EXPRESS.JS

//GET

const express = require('express') //zasysa moduł express.js
const app = express() //przechowuje moduł w const, zeby nie trzeba było dużo pisać
const port = process.env.PORT || 3000 //dokładnie, słucha zmiennej środowiskowej, jesli brak słucha na 3000
const kooperanter = [
    {id: 1, name: 'kooperant1'},
    {id: 2, name: 'kooperant2'},
    {id: 3, name: 'kooperant3'}
]

app.get('/', (req, res) => {
    res.send('hello') //tak, z expressem wpisujesz za pomocą metody send
})
app.get('/api/kooperanci', (req, res ) => { //funkcja, która zwraca rekord/obiekt lub w naszym wypadku tablicę z kooperantami jako obiektami
    res.send(kooperanter)
})
app.get('/api/kooperanci/:id/:zamowienie', (req, res) => {
    res.send(req.params)
})
app.get('/api/kooperanci/:id', (req, res) => {
    const osoba = kooperanter.find(i => i.id === parseInt(req.params.id))
    if (!osoba) res.status(404).send('nie ma takiego kooperanta')
    res.send(osoba)
})
app.listen(port, () => { //metoda express stawiająca serwer słuchający na porcie zdefiniowanym w zmiennej port
    console.log(`listening on ${port}`) //zwraca do konoli potwierdzenie; koniec funkcji
}) //koniec metody

//POST

app.use(express.json()) //middleware, parsuje wszystko do JSON
const Joi = require('joi') //returns a class
app.post('/api/kooperanci', (req, res) => {

    //VALIDATION WITH JOI

    const schema = {
        name: Joi.string().min(3).required() //name musi być stringiem o conajmniej 3 znakach i być podane
    }
    const result = Joi.validate(req.body, schema) //returns an object
    if (result.error) {
        res.status(400).send(result.error.details[0].message) //wrong request, wysyła status 400 i output Joi 
        return //należy zakończyć funkcję
    } 

    //HARD CODED VALIDATION

    /* if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('kooperant musi mieć imię dłuższe niż dwa znaki') //wrong request
        return //należy zakończyć funkcję
    } */

    const osoba = {
        id: kooperanter.length + 1,
        name: req.body.name
    }
    kooperanter.push(osoba)
    res.send(osoba)
})

//PUT

function validateKooperant(osoba) { //reusable validation fn with Joi
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(osoba, schema)
}

app.put('/api/kooperanci/:id', (req, res) => {
    //search for kooperant
    //if kooperant nie istnieje, wyslij 404

    const osoba = kooperanter.find(i => i.id === parseInt(req.params.id))
    if (!osoba) {
        res.status(404).send('nie ma takiego kooperanta')
        return
    }
    //zwaliduj kooperanta
    //if kooperant invalid, wyslij 400 - wrong request

    //HARD CODED WITH JOI
    
    /* const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return 
    }  */

    //DONE WITH REUSABLE FN //should be put outside app.put body to be reusable

    /* function validateKooperant(osoba) {
        const schema = {
            name: Joi.string().min(3).required()
        }
        return Joi.validate(osoba, schema)
    } */
    const result = validateKooperant(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return 
    }

    //update kooperant
    //return kooperant
    osoba.name = req.body.name
    res.send(osoba)
})

//DELETE

app.delete('/api/kooperanci/:id', (req, res) => {
    //znalezc kooperanta
    //if kooperant nie istnieje, return 404

    const osoba = kooperanter.find(i => i.id === parseInt(req.params.id))
    if (!osoba) {
        res.status(404).send('nie ma takiego kooperanta')
        return
    }
    //delete kooperant

    const index = kooperanter.indexOf(osoba) //znajduje index osoby z tablicy kooperanter
    kooperanter.splice(index, 1) //wyjebuje 1 element na pozycji index

    //return kooperant
    res.send(osoba)
})





