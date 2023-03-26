import { OkPacket } from "mysql2";
import { execute } from "../1-dal/dalSql";
import { UserInterface } from "../models/UserModel";

export async function getAllUsers() {
    const query = 'SELECT * FROM users'
    const [results] = await execute(query)
    return results
}

export async function register(user: UserInterface) {
    const { firstName, lastName, email, password, language, difficulty, type } = user;
    const checkIfEmailExistQuery = `SELECT * FROM users WHERE email = ?`
    const [emailResults] = await execute<OkPacket>(checkIfEmailExistQuery, [email]);
    if (emailResults.length > 0) {
        return 'Email already exist'
    } else {
        const query = 'INSERT INTO users(firstName,lastName,email,password,language,difficulty,type) VALUES(?,?,?,?,?,?,?)'
        const [results] = await execute<OkPacket>(query, [firstName, lastName, email, password, language, difficulty, type])
        user.id = results.insertId;
        return results
    }
}