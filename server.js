const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const app = require('./app');
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
mongoose.connect(DB, {
    useNewUrlParses:true
})
.then(() => console.log('Db connection succesful'))

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})