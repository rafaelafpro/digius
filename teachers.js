const fs = require('fs')
const data = require('./data.json')

exports.post = function (req, res) {
    const keys = Object.keys(req.body);

    for (key of keys){
        if (req.body[key] == '') {
            return res.send ("Please, fill all forms");
        }
    }

    let {avatar_url, name, birth, level, type, disciplines} = req.body

    bith = Date.parse(birth)
    const id = Number(data.teachers.length)
    const created_at = Date.now()

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        level,
        type,
        disciplines,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err){
        if (err) return res.send ("Write File Error!")

        return res.redirect ('/teachers');
    })

}