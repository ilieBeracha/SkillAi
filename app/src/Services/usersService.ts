import axios from "axios"
import { UserInterface } from "../models/UserModel"
import { BASE_URL } from "./config"

class UsersService {
    async register(user: UserInterface) {
        const results = (await axios.post(`${BASE_URL}/register`, user));
        return results;
    }
    async login(user: UserInterface) {
        const results = (await axios.post(`${BASE_URL}/login`, user));
        return results;
    }
}

export const userService = new UsersService()