import {configureStore} from '@reduxjs/toolkit'
import {testResultSlice} from "./testReducer";
import {answerSlice} from "./answersReducer";

export const store = configureStore({
    reducer: {
        [testResultSlice.name]: testResultSlice.reducer,
        [answerSlice.name]: answerSlice.reducer
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;