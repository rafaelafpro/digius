const { simpleDate, age, graduation, grade } = require('../../lib/utils.js');
const Intl = require('intl');
const Teacher = require('../models/Teacher.js')



module.exports = {
    index(req, res) {
        Teacher.all(function(results){
            for (let i=0 ; i < results.length ; i++){
                results[i].subjects_taught = results[i].subjects_taught.split(',')
            }
            return res.render('teachers/index', {teachers: results})
        })
    },

    create(req, res) {
        return res.render("teachers/create")
    },
    
    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys){
            if (req.body[key] == '') {
                return res.send ("Please, fill all forms");
            }
        }
        

        Teacher.create(req.body, function(teacher){
            return res.redirect(`teachers/${teacher.id}`)
        })
    },
    show(req, res){
        const {id} = req.params

        Teacher.find(id, function(teacher){
            if (!teacher) return res.send("Teacher not found")
            
            teacher.age = age(teacher.birth_date)
            teacher.education_level = graduation(teacher.education_level)
            teacher.subjects_taught = teacher.subjects_taught.split(',')
            teacher.created_at = simpleDate(teacher.created_at).format

            return res.render('teachers/show', {teacher})
        })
 
    },

    edit(req, res){
        return
    },
    put(req, res){
        return
    },
    delete(req, res){
        return
    }
}