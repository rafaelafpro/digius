module.exports = {
    age(timestamp) {
        const today = new Date();
        const birthDate = new Date(timestamp);

        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();

        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate){
            age= age - 1;
        }
        
        return age;
    },

    simpleDate(timestamp) {
        const date = new Date(timestamp);
        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth()+1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);
        
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    },


    graduation(level){
        if (level == 'mestrado') return 'Mestrado'
        if (level == 'doutorado') return 'Doutorado'
        if (level == 'medio') return 'Ensino Médio Completo'
        if (level == 'superior') return 'Ensino Superior Completo'
    },

    grade(level){
        if (level == '5f') return "5º ano do Ensino Fundamental"
        if (level == '6f') return "6º ano do Ensino Fundamental"
        if (level == '7f') return "7º ano do Ensino Fundamental"
        if (level == '8f') return "8º ano do Ensino Fundamental"
        if (level == '9f') return "9º ano do Ensino Fundamental"
        if (level == '1a') return "1º ano do Ensino Médio"
        if (level == '2a') return "2º ano do Ensino Médio"
        if (level == '3a') return "3º ano do Ensino Médio"
    }

}