import { useForm } from "react-hook-form";
import { UserInterface } from "../../models/UserModel";
import { userService } from "../../Services/usersService";
import { useDispatch } from 'react-redux';
import "./RegisterPage.css";
import { loginRedux } from "../../app/authSlice";
import { toastAlerts } from "../../helpers/toastAlerts";
import { useNavigate } from 'react-router-dom';

function RegisterPage(): JSX.Element {
    const { register, handleSubmit } = useForm<UserInterface>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function Register(user: UserInterface) {
        if (user.difficulty === "" || user.language === "") return;
        try {
            const results = await userService.register(user);
            if (results.status === 200) {
                const token = await results.data;
                dispatch(loginRedux(token))
                navigate('/')
                toastAlerts.toastSuccess('Successfuly Registered')
            }
        } catch (e: any) {
            toastAlerts.toastError(e.response.data)
        }

    }

    return (
        <div className="RegisterPage">
            <div className="AuthForm">
                <form onSubmit={handleSubmit(Register)}>
                    <h2>Create an account</h2>
                    <label htmlFor="firstName">First name:</label>
                    <input type="text" id="firstName" {...register('firstName', {
                        required: true
                    })} />

                    <label htmlFor="lastName">Last name:</label>
                    <input type="text" id="lastName" {...register('lastName', {
                        required: true
                    })} />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" {...register('email', {
                        required: true
                    })} />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" {...register('password', {
                        required: true,
                        min: 4
                    })} />

                    <label htmlFor="">Language:</label>
                    <select {...register('language', {
                        required: true
                    })}>
                        <option value=""></option>
                        <option value="javascript">Javascript</option>
                        <option value="typeScript">TypeScript</option>
                        <option value="python">Python</option>
                        <option value="css">CSS</option>
                        <option value="html">HTML</option>
                    </select>

                    <label>Difficulty:</label>
                    <select {...register('difficulty', {
                        required: true
                    })}>
                        <option value=""></option>
                        <option value="EASY">Easy</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HARD">Hard</option>
                    </select>
                    <label>Type:</label>
                    <select {...register('type', {
                        required: true
                    })}>
                        <option value=""></option>
                        <option value="5 minutes project">Practical</option>
                        <option value="logical questions">Logical</option>
                    </select>
                    <button type="submit">Create account</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
