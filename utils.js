module.exports = {
    age: function(timestamp) {
        const today = new Date();
        const birthDate = new Date(timestamp);

        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();

        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate){
            age= age - 1;
        }
        
        return age;
    },

    simpleDate: function(timestamp) {
        const date = new Date(timestamp);
        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth()+1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        const dateString = `${year}-${month}-${day}`;
        
        return dateString;
    },

    graduation: function(level){
        if (level == 'mestrado') return 'Mestrado'
        if (level == 'doutorado') return 'Doutorado'
        if (level == 'medio') return 'Ensino Médio Completo'
        if (level == 'superior') return 'Ensino Superior Completo'
    }

}