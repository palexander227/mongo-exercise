import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  day: {type: Date, default: Date.now},
  exercises: [
    {
      type: {type: String, required: true},
      name: {type: String, required: true},
      weight: Number,
      sets: Number,
      reps: Number,
      duration: {type: Number, required: true},
      distance: Number
    },
  ],
});

const Workout = mongoose.model("workout", workoutSchema);

export default Workout;
