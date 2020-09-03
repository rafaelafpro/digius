const db = require('../../config/db.js')
const {simpleDate, age} = require('../../lib/utils.js')

module.exports = {
    all(callback){
        db.query(`SELECT * FROM students`, function(err, results){
            if (err) throw `Database error on ${err}`

            callback(results.rows)
        })
    },
    create(data, callback){
        const query = `
            INSERT INTO students (
            name,
            birth_date,
            email,
            level,
            charge,
            avatar_url,
            teacher_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.name,
            simpleDate(data.birth_date).iso,
            data.email,
            data.level,
            data.charge,
            data.avatar_url,
            data.teacher
        ]


        db.query(query, values, function(err, results){
            if (err) throw `Database error on ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`
        SELECT students.*, teachers.name AS teacher_name
        FROM students
        LEFT JOIN teachers ON (teachers.id = students.teacher_id) 
        WHERE students.id = $1`, [id], function(err, results){
            if (err) throw `Database error on ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback){
        const query=`
            UPDATE students SET
            avatar_url = ($1),
            name = ($2),
            birth_date = ($3),
            email = ($4),
            level = ($5),
            charge = ($6),
            teacher_id = ($7)
            WHERE id = $8
        `

        const values = [
            data.avatar_url,
            data.name,
            simpleDate(data.birth_date).iso,
            data.email,
            data.level,
            data.charge,
            data.teacher,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `${err}`

            callback();
        })
    },
    delete(id, callback){
        query = `DELETE FROM students WHERE id = $1`

        db.query(query, [id], function(err, results){
            if (err) throw `${err}`

            callback()
        })
    },
    teacherOptions(callback){
        db.query('SELECT name, id FROM teachers', function(err, results){
            if (err) throw `${err}`

            callback(results.rows)
        })
    }
}