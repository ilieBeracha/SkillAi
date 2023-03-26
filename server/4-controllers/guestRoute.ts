import express from 'express';
import { generateGuestToken } from '../1-dal/jwt';
import { asGuest } from '../3-logic/guestLogic';


export const GuestRoute = express.Router();

GuestRoute.post('/asguest', async (req, res) => {
    const guest = req.body;
    console.log(guest);
    
    try {
        const results = await asGuest(guest);
        console.log(results);
        
        const token = await generateGuestToken(guest)
        res.status(200).json(token);
    } catch (e) {
        res.status(401).json(e);
    }
})
