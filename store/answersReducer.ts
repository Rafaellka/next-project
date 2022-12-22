import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";

const initialState = [false, false, false, false];

export const answerSlice = createSlice({
    name: 'answers',
    initialState,
    reducers: {
        selectAnswer(state, payload: PayloadAction<{index: number, checked: boolean}>) {
            state[payload.payload.index] = payload.payload.checked;
        },
        reset(state) {
            state[0] = false;
            state[1] = false;
            state[2] = false;
            state[3] = false;
        }
    }
});

export const {selectAnswer, reset} = answerSlice.actions;