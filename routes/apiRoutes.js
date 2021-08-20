import express from 'express';
import { continueWorkout, createWorkout, getWorkout } from "../controllers/dbController.js"

const app = express();
app.use(express.json())

app.get('/workouts', getWorkout)
app.post('/workouts', createWorkout)
app.put('/workouts/:id', continueWorkout)
app.get("/workouts/range", getWorkout)

export default app;
