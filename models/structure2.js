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
        required:true,    
    }
}, {timestamps:true});
const Note = mongoose.model('Note', userSchema)
module.exports = Note;