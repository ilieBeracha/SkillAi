import * as jwt from 'jsonwebtoken';
import { GuestInterface } from '../models/GuestModal';
import { UserInterface } from '../models/UserModel';

export const PRIVATE_KEY = "BDJKQsalbjsakbdjsabdjsbdWBDKJQWBJDQWD"

export async function generateToken(user: UserInterface) {
    return jwt.sign({
        'sub': user.id,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email,
        'language': user.language,
        'difficulty': user.difficulty,
        'type': user.type
    }, PRIVATE_KEY)
}

export async function generateGuestToken(guest: GuestInterface) {
    return jwt.sign({
        'sub': guest.id,
        'language': guest.language,
        'difficulty': guest.difficulty,
        'type': guest.type
    }, PRIVATE_KEY)
}


export async function getIdFromToken(token: any) {
    try {
        const verifyToken = jwt.verify(token.substring(7), PRIVATE_KEY);
        return verifyToken.sub
    } catch (e) {
        return e
    }
}