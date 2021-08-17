import express from 'express';
import { createWorkout, getLastWorkout } from "../controllers/dbController.js"

const app = express();
app.use(express.json())

app.get('/workouts', getLastWorkout)
app.post('/workouts', createWorkout)

export default app;
