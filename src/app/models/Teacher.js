const { simpleDate, age, graduation, grade } = require('../../lib/utils.js');
const db = require('../../config/db.js')

module.exports = {

    all(callback){
        db.query('SELECT * FROM teachers', function(err, results){
            if (err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },

    create(data, callback){
        const query = `
            INSERT INTO teachers (
                    avatar_url,
                    name,
                    birth_date,
                    education_level,
                    class_type,
                    subjects_taught,
                    created_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id
            `

        const values = [
            data.avatar_url,
            data.name,
            simpleDate(data.birth_date).iso,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            simpleDate(Date.now()).iso
        ]

        
        db.query(query, values, function(err, results){
            if (err) throw `Database Error ${err}`
            
            callback(results.rows[0])
        })
    },

    find(id, callback) {

        db.query(`
        SELECT * 
        FROM teachers 
        WHERE id = $1`, [id], function(err, results){
            console.log('Executando db query...');
            if (err) throw `Database Error! ${err}`  
            callback(results.rows[0])
        })
    },
}