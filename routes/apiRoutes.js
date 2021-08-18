import express from 'express';
import { continueWorkout, createWorkout, getLastWorkout } from "../controllers/dbController.js"

const app = express();
app.use(express.json())

app.get('/workouts', getLastWorkout)
app.post('/workouts', createWorkout)
app.put('/workouts/:id', continueWorkout)

export default app;
