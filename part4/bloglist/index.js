const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGODB_URI, PORT } = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')


mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})