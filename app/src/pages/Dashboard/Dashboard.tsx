import { useSelector } from "react-redux";
import "./Dashboard.css";

function Dashboard(): JSX.Element {
    const authSlice = useSelector((state: any) => state.auth);
    return (
        <div className="Dashboard">
            <div className="DashboardWelcome">
                <h1>Welcome {authSlice.firstName + " " + authSlice.lastName}</h1>
            </div>

            <div className="DashboardGraphs">
                
            </div>
        </div>
    );
}

export default Dashboard;
