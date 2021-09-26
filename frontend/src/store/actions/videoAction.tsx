import axios from "axios";
import { Dispatch } from 'redux';
import { set_percentage } from "../../utils/actionTypes";
import { UploadFile } from "../../utils/routes";

export const videoAction = (data: FormData) => {
    return (dispatch: Dispatch, getState: any) => {
        axios
            .post(UploadFile, data, {
                onUploadProgress(progressEvent: { loaded: number; total: number }) {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    dispatch({ type: set_percentage, payload: percentCompleted })
                    //below is double destructuring
                    const { videoReducer: { percentage } } = getState();
                    if (percentage === 100) {
                        setTimeout(() => {
                            dispatch({ "type": set_percentage, payload: 0 })
                        }, 500);
                    }
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(r => console.log(" "))
            .catch(e => console.log(e))
    }
}