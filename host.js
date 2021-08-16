import mongoose from 'mongoose'



mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const host = mongoose.connection
host.on('error', console.error.bind(console, 'mongo connection error'))

export default host