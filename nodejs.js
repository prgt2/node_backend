const mysql = require('mysql');
const connectio = mysql.createConnection({
    host: "mintR540",
    user: "einverv",
    password: "yaq",
    database: "koop"
})

connectio.connect((err) => {
    if (err) {
        //throw err //wypierdala błąd i terminuje funkcję, ale czemuś nie dizała
    }
    console.log('ecce connectio')
    connectio.query('select * from kooperant', (err, result, fields) => {
        if (err) console.log("errorum")
        console.log(result)
    })
})
