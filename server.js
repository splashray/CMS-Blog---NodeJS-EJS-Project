const express = require('express')
const articleRouter = require('./routes/article')
require('dotenv').config()
const Article = require('./models/article')
const methodOverride = require('method-override')
const app = express()
const connectDB = require('./db/connect')
const path = require('path')
// const { time } = require('console')

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,"public/assets")))


app.get('/', async(req,res)=>{
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('index',{title:"CMS Blog Website by John", articles: articles} )
})
// app.get('/articles', async(req,res)=>{
//     const articles = await Article.find().sort({createdAt: 'desc'})
//     res.render('index',{title:"CMS Blog Website by John", articles: articles} )
// })
app.use('/articles', articleRouter)


const port = process.env.PORT || 5000

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    }catch(error){
        console.log(error);
    }
}
start()

// app.listen(port, ()=>{
//     console.log(`listening to server on port ${port}`)
// })