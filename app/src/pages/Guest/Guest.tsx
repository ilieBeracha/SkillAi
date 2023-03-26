import "./Guest.css";
import { useForm } from "react-hook-form";
import { GuestInterface } from "../../models/GuestModal";
import { guestService } from "../../Services/guestService";
import { useDispatch } from 'react-redux';
import { loginRedux } from "../../app/authSlice";
import { toastAlerts } from "../../helpers/toastAlerts";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Guest(): JSX.Element {
    const { register, handleSubmit } = useForm<GuestInterface>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function asGuest(guest: GuestInterface) {

        try {
            const results = await guestService.asGuest(guest);

            if (results.status === 200) {
                const token = await results.data;
                dispatch(loginRedux(token))
                navigate('/')

                toastAlerts.toastSuccess('Successful')
            }
        } catch (e: any) {
            toastAlerts.toastError(e.response.data)
        }
    }

    return (
        <div className="Guest">
            <div className="AuthForm">
                <form onSubmit={handleSubmit(asGuest)}>
                    <label htmlFor="">Language:</label>
                    <select {...register('language', {
                        required: true
                    })}>
                        <option value=""></option>
                        <option value="javascript">Javascript</option>
                        <option value="python">Python</option>
                    </select>

                    <label htmlFor="">Difficulty:</label>
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
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Guest;
