import axios from "axios"
import { GuestInterface } from "../models/GuestModal";
import { BASE_URL } from "./config"

class GuestService {
    async asGuest(guest: GuestInterface) {
        const results = (await axios.post(`${BASE_URL}/asguest`, guest));
        return results;
    }

    
}

export const guestService = new GuestService()