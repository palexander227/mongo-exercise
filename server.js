import express from 'express'
import mongoose from "mongoose"
import apiRoutes from './routes/apiRoutes.js'
import path from 'path'

mongoose
  .connect("mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(success => console.log("Database connected successfully!"))
  .catch(err => console.log("error occured while connecting to database", err))

const app = express()
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use('/api', apiRoutes);

// This may be a duplicate of line 16.
// Every file in the public folder is available on the matching path because we are using static middleware, right?
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "exercise.html"))
})
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "stats.html"))
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})