const mongoose = require('mongoose');

var schema = new mongoose.Schema({
   
    email : {
        type: String,
        required: true,
        unique: true
    },
    date : {
        type: Date,
        default: Date.now
    },
    environment :{
        type : String
    },
    component : {
        type : String
    },
    message:{
        type : String
    },
    data:{
        type : Object
    }
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;