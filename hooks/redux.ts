import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";
import {bindActionCreators} from "redux";
import {testResultSlice} from "../store/testReducer";
import {answerSlice} from "../store/answersReducer";

const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppAction = () => {
    const dispatch = useAppDispatch();

    return bindActionCreators({
        ...testResultSlice.actions,
        ...answerSlice.actions
    }, dispatch);
}