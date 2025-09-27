const { text } = require('express');
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    title:{
        type:String,
        required:true,
        unique:true,
    },
    content:{
        type:String,        
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',            
    }
}, {timestamps:true});
const User = mongoose.model('User1', userSchema)
module.exports = User;