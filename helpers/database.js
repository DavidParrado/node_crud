const mongoose = require('mongoose');


const dbConnection = async() => {
    try {
        await mongoose.connect('mongodb+srv://user_node_test:IBUVG3NfcjYrf4UL@cluster0.efwlhgk.mongodb.net/test', () => {
            console.log('Base de datos conectada')
        });
    } catch (error) {
        console.log( error );
    }
}

module.exports = { 
    dbConnection
}