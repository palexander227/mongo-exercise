import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema({
    day: Date,
    exercise: Array
})

const Workout = mongoose.model('workout', workoutSchema)





export default Workout