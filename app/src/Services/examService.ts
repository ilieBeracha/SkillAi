import axios from "axios";
import { ExamContentModal } from "../models/ExamContentModal";
import { examModel } from "../models/ExamModal";
import { BASE_URL } from "./config"

class ExamService {
    async addExam(exam: examModel) {
        const results = await (await axios.post(`${BASE_URL}/addexam`, exam)).data;
        return results;
    }

    async addExamContent(content: ExamContentModal) {
        const results = await (await axios.post(`${BASE_URL}/addexamcontent`, content)).data;
        return results;
    }

    async updateExamRate(data: any) {
        const results = await (await axios.post(`${BASE_URL}/updateexamrate`, data)).data;
        return results;
    }
}

export const examService = new ExamService();