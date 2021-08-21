// do all database work in here

import Workout from "../models/workout.js";

export const createWorkout = (req, res) => {
  Workout.create({}, (err, data) => {
    if (err) res.json(err);
    res.json(data);
  });
};


//this route works for getting both recent workout and stats for all workouts(weight and totalDuration for seven days)
export const getWorkout = (req, res) => {
  Workout.aggregate(
    [
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
        },
      },
    ],
    (err, data) => {
      if (err) res.json(err);
      res.json(data);
    }
  )
};

//this route works for getting both recent workout and stats for all workouts(weight and totalDuration for seven days)
export const getWorkoutInRange = (req, res) => {
  /*const day7Past = new Date();
  day7Past.setDate(day7Past.getDate()-7);
  day7Past.setHours(0);
  day7Past.setMinutes(0);
  console.log("got here>>", day7Past.toISOString());
 Workout.find(
   {
     "day": {
       "$gte": day7Past
     }
   },
   (err, data) => {
    if (err) res.json(err);
    res.json(data);
   }
 )*/

 Workout.aggregate(
  [
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ]).sort("-day").limit(7).then(data => res.json(data.reverse()))
};


export const continueWorkout = (req, res) => {
  const { id } = req.params;
  const workoutDetails = req.body;
  Workout.findByIdAndUpdate(
    { _id: id },
    { $push: { exercises: workoutDetails } },
    { new: true },
    (err, data) => {
      if (err) res.json(err);
      res.json({ success: true, data });
    }
  );
};
