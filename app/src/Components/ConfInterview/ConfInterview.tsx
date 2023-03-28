import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addInterviewSettings } from '../../app/interviewSlice';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,

    '& label': {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: 'bold',
    },

    '& select': {
        display: 'block',
        width: '100%',
        padding: '0.5rem',
        marginBottom: '1rem',
        border: '1px solid #ccc',
        borderRadius: '0.25rem',
        backgroundColor: '#fff',
        fontSize: '1rem',
    },

    '& button[type="submit"]': {
        display: 'block',
        width: '100%',
        padding: '0.5rem',
        border: 'none',
        borderRadius: '0.25rem',
        color: 'black',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
};


export default function ConfInterview() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    function StartInterview(data: any) {
        console.log(data);

        if (data.language && data.difficulty) {
            dispatch(addInterviewSettings(data))
        }
    }

    return (
        <div className='ConfInterview'>
            <button onClick={handleOpen}>Interview</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit(StartInterview)}>

                        <label htmlFor="">Language:</label>
                        <select {...register('language', {
                            required: true
                        })}>
                            <option value=""></option>
                            <option value="javascript">Javascript</option>
                            <option value="python">Python</option>
                            <option value="css">CSS</option>
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
                        {/* <label>Type:</label>
                        <select {...register('type', {
                            required: true
                        })}>
                            <option value=""></option>
                            <option value="5 minutes project">Practical</option>
                            <option value="logical questions">Logical</option>
                        </select> */}
                        <button type="submit">Start</button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}