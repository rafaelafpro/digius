const { simpleDate, age, graduation, grade } = require('../../lib/utils.js');
const Intl = require('intl');
const Student = require('../models/Student.js')



module.exports = {
    index(req, res) {
        Student.all(function(students){
            return res.render('students/index', {students})
        })
    },
    create(req, res) {

        Student.teacherOptions(function(teachers){
            return res.render('students/create', {teacherOptions: teachers})
        })

    },
    post(req, res) {

        
        Student.create(req.body, function(result){

            return res.redirect(`/students/${result.id}`)
        })
    },
    show(req, res) {
        const {id} = req.params

        Student.find(id, function(student){
            if (!student) res.send('Student not found')

            student.age = age(student.birth_date)
            return res.render('students/show', {student})
        })
    },
    edit(req, res){
        const {id} = req.params
        
        Student.find(id, function(student){
            if (!student) res.send('Student not found')

            student.birth_date = simpleDate(student.birth_date).iso
            
            Student.teacherOptions(function(teachers){
                return res.render('students/edit', {teacherOptions: teachers, student})
            })

            
        })
    },
    put(req, res){
        console.log(req.body);
        
        Student.update(req.body, function(){

            return res.redirect(`/students/${req.body.id}`)
        }) 
       
    },
    delete(req, res) {
        const {id} = req.body

        Student.delete(id, function(){

            return res.redirect('/students')
        })
    }

}