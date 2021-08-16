import express from 'express'
import mongoose from 'mongoose'




const router = express.Router()

router.get('/workouts', (req, res) => {
    console.log('get workouts')
})

export default router
