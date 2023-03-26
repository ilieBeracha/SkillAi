import "./LandingPageHome.css";
import CodeIcon from '@mui/icons-material/Code';
import image from '../../assets/images/interview4.png'
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
            </div>
            <div className="LandingPageHomeImage">
                <img src={image} alt="" />
            </div>
        </div>
    );
}

export default LandingPageHome;
