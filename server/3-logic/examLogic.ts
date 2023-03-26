import { OkPacket } from "mysql2";
import { execute } from "../1-dal/dalSql";
import { examContentModel } from "../models/ExamContentModal";
import { examModel } from "../models/ExamModal";

export async function addExam(exam: examModel) {
    const { language, difficulty, type, userId, rate } = exam;
    const query = `INSERT INTO exams (language, difficulty, type, userId, rate) VALUES (?,?,?,?,?)`;
    const [results] = await execute<OkPacket>(query, [language, difficulty, type, userId, rate]);
    exam.id = results.insertId;
    return results
}

export async function addExamContent(content: examContentModel) {
    const { examId, answer, question } = content;
    const query = `INSERT INTO examcontent (examId, answer, question) VALUES (?,?,?)`;
    const [results] = await execute<OkPacket>(query, [examId, answer, question]);
    content.id = results.insertId;
    return results;
}

export async function updateExamRate(data:any) {    
    const { id, rate } = data;    
    const query = `UPDATE exams SET rate = ? WHERE id = ?`;
    const [results] = await execute<OkPacket>(query, [rate, id]);    
    return results;
}