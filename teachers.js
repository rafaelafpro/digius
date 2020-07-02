const fs = require('fs');
const data = require('./data.json');
const { simpleDate, age, graduation } = require('./utils.js');
const Intl = require('intl');


exports.index = function (req,res) {
    
    let teachers = data.teachers;
    
    for (let i=0 ; i < teachers.length ; i++){
        teachers[i].disciplines = String(teachers[i].disciplines)
        teachers[i].disciplines = teachers[i].disciplines.split(', ');
        
    }
   

    
    return res.render("teachers/index", {teachers});

}


exports.post = function (req, res) {
    const keys = Object.keys(req.body);

    for (key of keys){
        if (req.body[key] == '') {
            return res.send ("Please, fill all forms");
        }
    }

    let {avatar_url, name, birth, level, type, disciplines} = req.body

    birth = Date.parse(birth)
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


exports.show = function (req, res) {
    const { id } = req.params;

    if (id > data.teachers.length){
        return res.send("Usuario inválido");
    }

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id;
    })

    const teacher = {
        ...foundTeacher,
        level: graduation(foundTeacher.level),
        disciplines: String(foundTeacher.disciplines).split(','),
        age: age(foundTeacher.birth),
        date: simpleDate(foundTeacher.birth),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
    }

    return res.render ('teachers/show.njk', { teacher })
}

exports.edit = function (req,res) {
    const { id } = req.params;

    if (id > data.teachers.length){
        return res.send("Usuario inválido");
    }

    const foundUser = data.teachers.find(function (teacher){
        return id == teacher.id;
    })

    const teacher = {
        ...foundUser,
        date: simpleDate(foundUser.birth)
    }

    return res.render('teachers/edit', { teacher })
}


exports.put = function (req, res) {
    let { id } = req.body;

    id = Number(id);

    let index = 0;

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if (teacher.id == id) {
            index = foundIndex;
            return true;
        }
    })

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("write file error...");

        return res.redirect(`/teachers/${id}`);
    })

}

exports.delete = function (req,res) {
    let { id } = req.body

    id = Number(id);

    const filteredTeachers = data.teachers.filter(function(teacher){
        return (teacher.id != id)
    })

    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('write file error...')

        return res.redirect("/teachers")
    })

}