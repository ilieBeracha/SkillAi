import express from 'express';
import { chatGpt, chatGptRate } from '../3-logic/chatGptLogic';

export const GptRoute = express.Router();

GptRoute.post('/interview', async (req, res) => {
    const data = req.body;

    try {
        const results = await chatGpt(data);
        res.status(200).json(results);
    } catch (e) {
        res.status(401).json(e)
    }
})

GptRoute.post('/rate', async (req, res) => {
    const data = req.body;
    console.log(data);
    
    try {
        const results = await chatGptRate(data);
        res.status(200).json(results);
    } catch (e) {
        res.status(401).json(e)
    }
})