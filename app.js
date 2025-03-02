const express = require('express')
const morgan = require('morgan')
const advertRouter = require('./routes/advertisementRoutes')
const authRouter = require('./routes/authRoutes')
const categoryRouter = require('./routes/categoryRoutes')
const commentRouter = require('./routes/commentRoutes')
const cors = require('cors')
const app = express();
app.use(cors())
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(express.json())
app.use('/api/v1/advertisements', advertRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/categories', categoryRouter
)
app.use('/api/v1/comments', commentRouter)
module.exports = app;