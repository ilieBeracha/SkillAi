import "./LandingPage.css";
import { Routes, Route } from 'react-router-dom';
import RegisterPage from "../RegisterPage/RegisterPage";
import LoginPage from "../LoginPage/LoginPage";
import Guest from "../Guest/Guest";
import LandingPageHome from "../LandingPageHome/LandingPageHome";


function LandingPage(): JSX.Element {
    return (
        <div className="LandingPage">
            <Routes>
                <Route path="/" element={<LandingPageHome />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<RegisterPage />}></Route>
                {/* <Route path="/guest" element={<Guest />}></Route> */}
            </Routes>
        </div>
    );
}

export default LandingPage;
