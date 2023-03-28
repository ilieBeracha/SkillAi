import "./Header.css";
import logo from '../../assets/images/logo.png';

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
