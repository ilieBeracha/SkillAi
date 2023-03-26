import "./Header.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutRedux } from "../../app/authSlice";
// import logo from '../../assets/images/logoWhite.png';
import logo from '../../assets/images/logo.png';
import BasicMenu from "../BasicMenu/BasicMenu";

function Header(): JSX.Element {
    const authSlice = useSelector((state: any) => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function logOut() {
        dispatch(logoutRedux());
        navigate('/')
    }

    return (
        <div className="Header">
            <div className="HeaderContainer">

                <div className="HeaderHeading">
                    <NavLink to="/">
                        <img src={logo} alt="" />
                    </NavLink>
                </div>


                <div className="HeaderAuthDiv">
                    {location.pathname.includes("guest") ?
                        <></> :
                        !authSlice ?
                            <>
                                <NavLink to='/login'>Login</NavLink>
                                <NavLink to='/register'>Register</NavLink>
                            </>
                            :
                            authSlice ?
                                <BasicMenu logOut={logOut} />
                                :
                                <button onClick={logOut}>Logout</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;
