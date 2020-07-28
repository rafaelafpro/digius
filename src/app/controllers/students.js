const { simpleDate, age, graduation, grade } = require('../../lib/utils.js');
const Intl = require('intl');



module.exports = {
    index(req, res) {
        let students = new Object(data.students);

        for (student of students){
            student.level = grade(student.level)
        }
    
        return 
    },
    create(req, res) {
        return
    },
    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys){
            if (req.body[key] == '') {
                return res.send ("Please, fill all forms");
            }
        }
    
    
        const birth = Date.parse(req.body.birth)
        
        let id = 1;
    
        if (data.students.length >= 1) {
            id = data.students.length + 1
        }
    
        data.students.push({
            id,
            ...req.body,
            birth
        })
    
        return
    },
    show(req, res) {
        // const { id } = req.params;

        // if (id > data.students.length){
        //     return res.send("Usuario inválido");
        // }
    
        
        // const foundStudent = data.students.find(function(student){
        //     return student.id == id;
        // })
    
    
        // const student = {
        //     ...foundStudent,
        //     age: age(foundStudent.birth)
        // }
    
        return 

    },
    edit(req, res){
        const { id } = req.params;

        if (id > data.students.length){
            return res.send("Usuario inválido");
        }
    
        const foundUser = data.students.find(function (student){
            return id == student.id;
        })
    
        const student = {
            ...foundUser,
            date: simpleDate(foundUser.birth)
        }
    
        return res.render('students/edit', { student })
    },
    put(req, res) {
        let { id } = req.body;

        id = Number(id);

        let index = 0;

        const foundStudent = data.students.find(function(student, foundIndex){
            if (student.id == id) {
                index = foundIndex;
                return true;
            }
        })

        const student = {
            ...foundStudent,
            ...req.body,
            birth: Date.parse(req.body.birth),
            id: Number(req.body.id)
        }

        data.students[index] = student;

        return
    },
    delete(req, res) {
        let { id } = req.body

        id = Number(id);
    
        const filteredStudents = data.students.filter(function(student){
            return (student.id != id)
        })
    
        data.students = filteredStudents
    
        return
    },

}