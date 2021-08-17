// do all database work in here

import Workout from "../models/workout.js"

export const createWorkout = (req, res) => {
    const workoutDetails = req.body;
    Workout.create(workoutDetails, (err, data) => {
        if(err) res.json(err)
        res.json({success: true, data})
    })
}

export const getLastWorkout = (req, res) => {
    Workout.find((err, data) => {
        if(err) res.json(err)
        res.json(data)
    })
}