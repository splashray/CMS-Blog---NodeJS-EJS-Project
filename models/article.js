const mongoose = require('mongoose')
const slugify = require('slugify')

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    body:{
        type:String, 
        required: true
    },
    createdAt:{
        type: Date, 
        default: Date.now
    },
    img:{
        type: String,
    }, 
    slug:{
        type: String,
        required: true,
        unique: true
    }
})

articleSchema.pre('validate', function (next) {
    if(this.title){
        this.slug = slugify(this.title,{
        lower:true,strict: true
        })
    }  
    next()
})

module.exports = mongoose.model('Article', articleSchema)