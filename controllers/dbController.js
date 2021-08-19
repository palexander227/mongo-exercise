// do all database work in here

import Workout from "../models/workout.js";

export const createWorkout = (req, res) => {
  Workout.create({}, (err, data) => {
    if (err) res.json(err);
    res.json(data);
  });
};

export const getLastWorkout = (req, res) => {
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
  );
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
