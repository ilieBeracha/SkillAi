import { useForm } from "react-hook-form";
import { loginRedux } from "../../app/authSlice";
import { toastAlerts } from "../../helpers/toastAlerts";
import { UserInterface } from "../../models/UserModel";
import { userService } from "../../Services/usersService";
import "./LoginPage.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function LoginPage(): JSX.Element {
    const { register, handleSubmit } = useForm<UserInterface>();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    async function Login(user: any) {
        console.log(user);
        try {
            const results = await userService.login(user);
            if (results.status === 200) {
                const token = await results.data;
                dispatch(loginRedux(token))
                navigate('/')

                toastAlerts.toastSuccess('Logged in');
            }
        } catch (e: any) {
            toastAlerts.toastError(e.response.data)
        }
    }


    return (
        <div className="LoginPage">
            <div className="AuthForm">
                <form onSubmit={handleSubmit(Login)}>
                    <h2>Login</h2>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" {...register('email')} />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" {...register('password')} />

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
