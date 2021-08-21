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

/*workoutSchema.virtual("totalDuration").get(function(){
  return this.exercises.reduce((prev, next) => {
    return prev + next.duration;
  }, 0);
})*/

const Workout = mongoose.model("workout", workoutSchema);

export default Workout;
