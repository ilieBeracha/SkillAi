import { OkPacket } from "mysql2";
import { execute } from "../1-dal/dalSql";
import { GuestInterface } from "../models/GuestModal";

export async function asGuest(guest: GuestInterface) {
    const { language, difficulty, type } = guest;
    
    const query = 'INSERT INTO guests(language,difficulty,type) VALUES(?,?,?)'
    const [results] = await execute<OkPacket>(query, [language, difficulty, type]);
    guest.id = results.insertId;
    return results;
}