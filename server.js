import express from 'express'
import apiRoutes from './routes/apiRoutes'
import path from 'path'


const PORT = process.env.PORT || 3000
const app = express()


app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', apiRoutes)









app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})