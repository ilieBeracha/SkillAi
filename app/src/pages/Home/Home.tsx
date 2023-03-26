import "./Home.css";
import { Routes, Route } from 'react-router-dom';
import Dashboard from "../Dashboard/Dashboard";
import Interview from "../Interview/Interview";

function Home(): JSX.Element {
    return (
        <div className="Home">
			<Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/interview" element={<Interview />}></Route>
            </Routes>
            
        </div>
    );
}

export default Home;
