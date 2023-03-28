import "./LandingPage.css";
import { Routes, Route } from 'react-router-dom';
import LandingPageHome from "../LandingPageHome/LandingPageHome";
import Interview from "../Interview/Interview";
import { useSelector } from "react-redux"

function LandingPage(): JSX.Element {
    const interviewSlice = useSelector((state: any) => state.interview)

    return (
        <div className="LandingPage">
            <Routes>
                {interviewSlice === null ?
                    <Route path="*" element={<LandingPageHome />}></Route>
                    :
                    <Route path="*" element={<Interview />}></Route>
                }
            </Routes>
        </div>
    );
}

export default LandingPage;
