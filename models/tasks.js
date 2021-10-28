const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'must provide with name'],
        unique:true,
        trim:true,
        maxlength:[20]
    },

    Password: {
        type:String,
        required:[true,'must provide with password'],
        trim:true,
    }
})

module.exports = mongoose.model('LoginandRegister',loginSchema);