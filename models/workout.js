import mongoose from "mongoose";

// const exerciseSchema = new mongoose.Schema({
//     type: String,
//     name: String,
//     weight: Number,
//     sets: Number,
//     reps: Number,
//     duration: Number,
//     distance: Number,
//     day: Date
// })

//const Exercise = mongoose.model('exercise', exerciseSchema)

const workoutSchema = new mongoose.Schema({
  day: {type: Date, default: Date.now},
  totalDuration: Number,
  exercises: [
    {
      type: {type: String, required: true},
      name: {type: String, required: true},
      weight: {type: Number, required: true},
      sets: {type: Number, required: true},
      reps: {type: Number, required: true},
      duration: {type: Number, required: true},
      distance: {type: Number},
    },
  ],
});

const Workout = mongoose.model("workout", workoutSchema);

// module.exports = { Workout, Exercise }
export default Workout;

/*

example of usage:
const { Workout, Exercise } = require('./workout');

import { Workout, Exercise } from './workout';


*/
