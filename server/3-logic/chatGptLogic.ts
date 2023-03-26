import { openai } from "../../../CryptoHarmony/server/1-dal/chatGpt";
import { InterviewData } from "../models/InterviewData";

export async function chatGpt(data: InterviewData) {
    const messages: any = [];
    messages.push({ role: 'system', content: 'Act like an robot who creates questions, write just json' })
    messages.push({ role: 'user', content: 'Give me 10 ' + data.difficulty + ' ' + data.type + ' in ' + data.language + 'in this format [{question: question, answer: answer}], Please refrain from providing any additional comments.' })

    try {
        const completion: any = openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: messages
        })
        let { data } = await completion

        const reply = data.choices[0].message.content;
        return reply;
    } catch (e) {
        console.log(e);
    }
}

export async function chatGptRate(data: any) {
    const stringifyData = JSON.stringify(data)
    
    const messages: any = [];
    messages.push({ role: 'system', content: 'Act like an robot who check tests, write just json' })
    messages.push({ role: 'user', content: 'Please provide your honest and critical feedback on the test takers answers, based on the questions provided in the exam. there are 10 questions, Rate the exam on a scale of 1 to 10, where each correct answer is worth 1 point and a perfect score is 10. Your feedback should be provided in the following format: [{rate: number, feedback: positive summary}]. Please refrain from providing any additional comments.' + ' exam: ' + ' ' + stringifyData  });
    try {
        const completion: any = openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: messages
        })
        let { data } = await completion

        const reply = data.choices[0].message.content;
        console.log(reply);
        return reply;
    } catch (e) {
        console.log(e);
    }
}