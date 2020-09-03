const { simpleDate, age, graduation, grade } = require('../../lib/utils.js');
const Intl = require('intl');
const Teacher = require('../models/Teacher.js')



module.exports = {
    index(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * ( page-1 )


        const params = {
            page,
            limit,
            offset,
            filter,
            callback(teachers){
                
                const pagination = {
                    total: Math.ceil(teachers[0].total / limit),
                    page
                }

                for (let i=0; i<teachers.length; i++){
                    teachers[i].subjects_taught = String(teachers[i].subjects_taught).split(',')
                }
                res.render("teachers/index", {teachers, filter, pagination})
            }
        }

        Teacher.paginate(params);

        // if (filter){
        //     Teacher.findBy(filter, function(results){
        //         for (let i=0 ; i < results.length ; i++){
        //             results[i].subjects_taught = results[i].subjects_taught.split(',')
        //         }
        //         return res.render('teachers/index', {teachers: results, filter})
        //     })
        // } else {
        //     Teacher.all(function(results){
        //         for (let i=0 ; i < results.length ; i++){
        //             results[i].subjects_taught = results[i].subjects_taught.split(',')
        //         }

        //         return res.render('teachers/index', {teachers: results})
        //     })
        // }

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
        const {id} = req.params

        Teacher.find(id, function(teacher){
            if (!teacher) return res.send("Teacher not found!")
            
            teacher.birth_date = simpleDate(teacher.birth_date).iso
    
            return res.render('teachers/edit', {teacher})
        })
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            if(req.body[key] == "") {
                return res.send ('Please, fill all forms')
            }
        }
        
        Teacher.update(req.body, function(){
            return res.redirect(`/teachers/${req.body.id}`)
        })
    },
    delete(req, res){
        
        const {id} = req.body

        Teacher.delete(id, function(){

            return res.redirect('/teachers')
        })

    }
}