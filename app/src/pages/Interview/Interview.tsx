import { useEffect, useState } from "react";
import Playground from "../../Components/Playground/Playground";
import { InterviewData } from "../../models/InterviewData";
import { gptService } from "../../Services/gptService";
import { useSelector } from 'react-redux'
import "./Interview.css";
import { TypeAnimation } from 'react-type-animation';

function Home(): JSX.Element {
    const [interviewData, setInterviewData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const authSlice = useSelector((state: any) => state.auth)
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [codeValue, setCodeValue] = useState<any[]>([]);
    const [results, setResults] = useState(false);
    const [answerEmpty, setAnswerEmpty] = useState(true);
    const [clearEditorValue, setClearEditorValue] = useState('')

    async function startInterview() {
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
    }

    useEffect(() => {
        startInterview()
    }, [])

    function nextQuestion() {
        if (currentQuestion === 9) {
            setResults(true)
            const res = gptService.getTestResults(codeValue);
            console.log(res);
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
            {isLoading ? (
                <TypeAnimation
                    sequence={[
                        'Building your inteview',
                        1000,
                        'Building your Assessment',
                        1000,
                        'Building your Test',
                        1000,
                        'Building your exam',
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

                        </div>
                    </div>
                    <div className="HomePlayground">
                        <Playground onCodeChange={handleCodeChange} clearEditorValue={clearEditorValue} />
                    </div>
                </div>
            ) : results ?
                <div className="HomeTestResults">
                    <button>Get test results</button>
                </div>
                :
                <></>}
        </div>
    );
}


export default Home;
