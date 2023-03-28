import "./LandingPageHome.css";
import CodeIcon from '@mui/icons-material/Code';
import image from '../../assets/images/interview4.png';
import view from '../../assets/images/view.png';
import clouds from '../../assets/images/clouds.png';
import ConfInterview from "../../Components/ConfInterview/ConfInterview";

function LandingPageHome(): JSX.Element {


    return (
        <div className="LandingPageHome">
            <div className="LandingPageHomePreview">
                <div className="LandingPageHomeSentance">
                    <h1>Improve Your coding skills with ease by using our AI-powered code interview tool</h1>
                </div>

                <div className="LandingPageHomeSentance">
                    <CodeIcon fontSize="large" />
                    <h3>Choose from multiple languages and get custom-built interview questions in seconds.</h3>
                    <CodeIcon fontSize="large" />

                </div>
                <div className="ConfInterviewDiv">

                    <ConfInterview />
                </div>
            </div>
            <div className="LandingPageHomeImage">
                <img id="cloudImg" src={clouds} alt="" />
                <img id="mountainImg" src={view} alt="" />
            </div>
        </div>
    );
}

export default LandingPageHome;
