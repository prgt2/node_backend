const mysql = require('mysql');
const connectio = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
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
