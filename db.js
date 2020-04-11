const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./casa-criativa.db')

db.serialize(function() {

    // criar tabela
    db.run(`
              CREATE TABLE IF NOT EXISTS ideas(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT,
                title TEXT,
                category TEXT,
                description TEXT,
                link TEXT
              );
            `)

    // deletar dado
    // db.run(`DELETE FROM ideas WHERE id = ?`, [10], function(err) {
    //     if (err) return console.log(err)

    //     console.log("Deletei", this)
    // })

    //consulta dados
    // db.all(`SELECT * FROM ideas`, function(err, rows) {
    //     if (err) return console.log(err)

    //     console.log(rows)
    // })

})

// exporting database for anywhere
module.exports = db