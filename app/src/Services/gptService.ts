import axios from "axios";
import { InterviewData } from "../models/InterviewData";
import { BASE_URL } from "./config";

class GptService {
    async sendInterviewData(language: string, difficulty: string, type: string) {
        const data: InterviewData = {
            language,
            difficulty,
            type
        }
        console.log(data);
        
        const results = await (await axios.post(`${BASE_URL}/interview`, data)).data;
        return results;
    }


    async getTestResults(data:any){
        const results = await (await axios.post(`${BASE_URL}/rate`, data)).data;
        return results;
    }
}

export const gptService = new GptService();