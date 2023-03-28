import { useEffect, useState } from "react";
import Playground from "../../Components/Playground/Playground";
import { gptService } from "../../Services/gptService";
import { useSelector } from 'react-redux'
import { TypeAnimation } from 'react-type-animation';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DoneIcon from '@mui/icons-material/Done';
import "./Interview.css";

function Interview(): JSX.Element {
    const [interviewData, setInterviewData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const interviewSlice = useSelector((state: any) => state.interview)
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [codeValue, setCodeValue] = useState<any[]>([]);
    const [results, setResults] = useState<any>([]);
    const [answerEmpty, setAnswerEmpty] = useState(true);
    const [clearEditorValue, setClearEditorValue] = useState('')
    const [startInterviewState, setStartInterviewState] = useState(false);
    const [isLoadingFinish, setIsLoadingFinish] = useState(false);

    async function startInterview() {
        setStartInterviewState(true)
        setIsLoading(true);
        try {
            const res = await gptService.sendInterviewData(interviewSlice.language, interviewSlice.difficulty);
            setInterviewData((JSON.parse(res)));
            console.log(JSON.parse(res));


        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        startInterview()
    },[])


    async function nextQuestion() {
        if (currentQuestion === 9) {
            setIsLoadingFinish(true)
            const res: any = await gptService.getTestResults(codeValue).then(res => JSON.parse(res));
            setResults(res)
            setIsLoadingFinish(false);
            return;
        } else {
            if (answerEmpty) {
                return;
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
                                        <>
                                            <div className="questionsFeedback">
                                                <span>{q.id}</span>
                                                <span>{q.question}</span>
                                                <span>{q.answer}</span>
                                                <span>{q.correct ? <DoneIcon fontSize="small" /> : <ErrorOutlineIcon fontSize="small" />}</span>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>

                    </div>
                    :
                        isLoading ? (
                            <TypeAnimation
                                sequence={[
                                    'Building your Interview',
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


export default Interview;
