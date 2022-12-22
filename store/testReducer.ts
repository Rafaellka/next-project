import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IQuestion} from "../pages";

export interface IQuestionWithUserAnswers extends IQuestion {
    id: number,
    userAnswers: boolean[];
}

const initialState: IQuestionWithUserAnswers[] = [];

export const testResultSlice = createSlice({
    name: 'testResult',
    initialState,
    reducers: {
        addAnswer(state, payload: PayloadAction<IQuestionWithUserAnswers>) {
            state.push(payload.payload)
        },
        changeAnswer(state, payload: PayloadAction<IQuestionWithUserAnswers>) {
            state[payload.payload.id].userAnswers = payload.payload.userAnswers;
        }
    }
});

//export const {} = testSlice.actions;