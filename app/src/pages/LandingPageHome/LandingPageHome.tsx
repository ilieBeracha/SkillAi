import "./LandingPageHome.css";
import CodeIcon from '@mui/icons-material/Code';
import DataArrayIcon from '@mui/icons-material/DataArray';
import { userService } from "../../Services/usersService";
import { NavLink } from 'react-router-dom';

function LandingPageHome(): JSX.Element {


    return (
        <div className="LandingPageHome">
            
            <div className="LandingPageHomePreview">
                <div className="LandingPageHomeSentance">
                    <CodeIcon fontSize="large" />
                    <h2>Improve Your coding skills with ease by using our AI-powered code interview tool</h2>
                    <CodeIcon fontSize="large" />
                </div>

                <div className="LandingPageHomeSentance">
                    <CodeIcon fontSize="large" />
                    <h3>Choose from multiple languages and get custom-built interview questions in seconds.</h3>
                    <CodeIcon fontSize="large" />
                </div>
                {/* <NavLink to='/guest'>
                    [ Try as a guest ]
                </NavLink> */}
            </div>
        </div>
    );
}

export default LandingPageHome;
