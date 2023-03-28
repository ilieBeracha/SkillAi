import "./Header.css";
import logo from '../../assets/images/logo.png';
import { useDispatch, useSelector } from "react-redux";
import { removeInterviewSettings } from "../../app/interviewSlice";
import { useEffect } from "react";

function Header(): JSX.Element {
    function goToLandingPage() {
        window.location.reload()
    }
    return (
        <div className='Header'>
            <div className="HeaderContainer">
                <div className="HeaderHeading" onClick={() => goToLandingPage()}>
                    <img src={logo} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Header;
