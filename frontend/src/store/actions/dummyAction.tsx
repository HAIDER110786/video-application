import axios from "axios";
import {
    loading_dummy_data,
    show_dummy_data,
    show_dummy_data_error
} from "../../utils/actionTypes";
import { Dispatch } from 'redux';
import { getDummyData } from './../../utils/routes';

export function dummyAction() {
    return (dispatch: Dispatch) => {
        dispatch({ type: loading_dummy_data });
        axios.get(getDummyData)
            .then(r => dispatch({ type: show_dummy_data, payload: r }))
            .catch(e => dispatch({ type: show_dummy_data_error, payload: e }))
    }
}