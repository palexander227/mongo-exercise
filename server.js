import express from 'express'
import mongoose from "mongoose"
import apiRoutes from './routes/apiRoutes.js'
import path from 'path'

const __dirname = path.resolve();


const PORT = process.env.PORT || 3001;
const app = express()

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(success => console.log("Database connected successfully!"))
.catch(err => console.log("error occured while connecting to database", err))


app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use('/api', apiRoutes);
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "exercise.html"))
})
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "stats.html"))
})

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})