import { useEffect, useState } from "react";
import Playground from "../../Components/Playground/Playground";
import { InterviewData } from "../../models/InterviewData";
import { gptService } from "../../Services/gptService";
import { useSelector } from 'react-redux'
import "./Interview.css";
import { TypeAnimation } from 'react-type-animation';
import { examService } from "../../Services/examService";
import { examModel } from "../../models/ExamModal";
import { ExamContentModal } from "../../models/ExamContentModal";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DoneIcon from '@mui/icons-material/Done';

function Home(): JSX.Element {
    const [interviewData, setInterviewData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const authSlice = useSelector((state: any) => state.auth)
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [codeValue, setCodeValue] = useState<any[]>([]);
    const [results, setResults] = useState<any>([]);
    const [answerEmpty, setAnswerEmpty] = useState(true);
    const [clearEditorValue, setClearEditorValue] = useState('')
    const [startInterviewState, setStartInterviewState] = useState(false);
    const [examId, setExamId] = useState(0);
    const [isLoadingFinish, setIsLoadingFinish] = useState(false);

    async function startInterview() {
        setStartInterviewState(true)
        setIsLoading(true);
        try {
            const res = await gptService.sendInterviewData(authSlice.language, authSlice.difficulty, authSlice.type);
            setInterviewData((JSON.parse(res)));
            console.log(JSON.parse(res));


        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
        const examData: examModel | any = {
            language: authSlice.language,
            difficulty: authSlice.difficulty,
            type: authSlice.type,
            userId: authSlice.sub,
            rate: 0
        }


        try {
            const res = await examService.addExam(examData);
            setExamId(res.insertId)
        } catch (e) {
            console.log(e);
        }
    }



    async function nextQuestion() {
        if (currentQuestion === 9) {
            setIsLoadingFinish(true)
            const res: any = await gptService.getTestResults(codeValue).then(res => JSON.parse(res));
            setResults(res)
            console.log(res);

            const updateExamData: any = {
                rate: res[0].rate,
                id: examId
            }

            try {
                await examService.updateExamRate(updateExamData);
            } catch (e) {
                console.log(e);
            }
            console.log(results);

            setIsLoadingFinish(false);
            return;
        } else {
            if (answerEmpty) {
                return;
            }
            const question = interviewData[currentQuestion].question;
            const answer = codeValue[currentQuestion].answer;
            const examContentData: ExamContentModal | any = {
                examId,
                question,
                answer,
            }
            try {
                await examService.addExamContent(examContentData);
            } catch (e) {
                console.log(e);
            }
            setCurrentQuestion(currentQuestion + 1);
            setAnswerEmpty(true);
        }

    }

    function handleCodeChange(value: string) {
        const newCodeValue = [...codeValue];
        const question = interviewData[currentQuestion].question;
        newCodeValue[currentQuestion] = { question, answer: value };
        console.log(newCodeValue);
        setCodeValue(newCodeValue);
        setAnswerEmpty(value.trim() === '');
    }

    window.onbeforeunload = function () {
        return "Data will be lost if you leave the page, are you sure?";
    };

    return (
        <div className="Home">
            {
                results.length !== 0 ?
                    <div className="HomeTestResults">
                        <h3>Rate: </h3> <hr /> <p> {results[0].rate}</p>
                        <h3>Feedback: </h3> <hr />  <p>{results[0].feedback}</p>
                        <h3>Questions: </h3> <hr />
                        <div className="">
                            {
                                results[0].questions.map((q: any, i: number) => {
                                    return (
                                        <div className="questionsFeedback">
                                            <span>{q.id+1}</span>
                                            <span>{q.question}</span>
                                            <span>{q.answer}</span>
                                            <span>{q.correct ? '+' : '-'}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                    :
                    startInterviewState === false ?
                        <button className="StartInterviewButton" onClick={startInterview}>Start Exam</button>
                        :
                        isLoading ? (
                            <TypeAnimation
                                sequence={[
                                    'Building your Inteview',
                                    1000,
                                    'Building your Assessment',
                                    1000,
                                    'Building your Test',
                                    1000,
                                    'Building your Exam',
                                    1000,

                                ]}
                                wrapper="span"
                                cursor={true}
                                repeat={Infinity}
                                style={{ fontSize: '2em', display: 'inline-block' }}
                            />
                        ) :
                            isLoadingFinish ? (
                                <TypeAnimation
                                    sequence={[
                                        'Reviewing your Inteview',
                                        1000,
                                        'Reviewing your Assessment',
                                        1000,
                                        'Reviewing your Test',
                                        1000,
                                        'Reviewing your Exam',
                                        1000,

                                    ]}
                                    wrapper="span"
                                    cursor={true}
                                    repeat={Infinity}
                                    style={{ fontSize: '2em', display: 'inline-block' }}
                                />

                            ) : interviewData ? (
                                <div className="InterviewContainer">
                                    <div className="HomeInterview">
                                        <div className="questions">
                                            <span>{interviewData[currentQuestion]?.question}</span>
                                        </div>
                                        <div className="questionBtns">
                                            <button className={answerEmpty ? 'btnDisbale' : 'nextButton'} disabled={answerEmpty} onClick={nextQuestion}>Next</button>
                                            {/* <button onClick={prevQuestion}>Previous</button> */}
                                            <div className="PageNumber">
                                                <p>{currentQuestion + 1}/10</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="HomePlayground">
                                        <Playground onCodeChange={handleCodeChange} clearEditorValue={clearEditorValue} />
                                    </div>
                                </div>
                            ) :
                                <></>}
        </div>
    );
}


export default Home;
