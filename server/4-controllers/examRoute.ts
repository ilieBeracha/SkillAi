import express from 'express';
import { addExam, addExamContent, updateExamRate } from '../3-logic/examLogic';

export const ExamRouter = express.Router();

ExamRouter.post('/addexam', async (req, res) => {
    const body = req.body;
    try {
        const result = await addExam(body);
        res.status(200).send(result)
    } catch (e) {
        res.status(400).send(e)
    }
})

ExamRouter.post('/addexamcontent', async (req, res) => {
    const body = req.body;
    console.log(body);

    try {
        const result = await addExamContent(body);
        res.status(200).send(result);
    } catch (e) {
        res.status(400).send(e);
    }
})

ExamRouter.post('/updateexamrate', async (req, res) => {
    const body = req.body;

    try{
        const result = await updateExamRate(body);
        res.status(200).send(result);
    }catch(e){
        res.status(400).send(e);
    }
})