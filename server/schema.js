const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    typesOf:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required: true,
    },
    avatar:{
        type:String,
        required: true,
    },
    msg: {
        type: String,
        required: true,
    },
    time: {
        type: Object,
        required: true
    }

});

 