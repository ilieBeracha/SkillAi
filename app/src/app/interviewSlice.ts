import { createSlice } from '@reduxjs/toolkit'


const interviewSlice = createSlice({
    name: 'interview',
    initialState: null,
    reducers: {
        addInterviewSettings: (state: any, actions: any) => {
            const { language, difficulty } = actions.payload;
            state = { language, difficulty }
            return state;
        },

        removeInterviewSettings:(state) =>{
            return null;
        }
    }
});

export const { addInterviewSettings, removeInterviewSettings } = interviewSlice.actions

export default interviewSlice.reducer