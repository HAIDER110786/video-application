import {
    loading_dummy_data,
    show_dummy_data,
    show_dummy_data_error
} from "../../utils/actionTypes";

export interface I1 {
    dummyData: string,
    dummyDataError: string,
    loadingDummyData: boolean
}

const initData = {
    dummyData: '',
    dummyDataError: '',
    loadingDummyData: false,
}

export const dummyReducer = (state: I1 = initData, action: { type: string, payload: string }) => {
    switch (action.type) {
        case loading_dummy_data:
            return {
                ...state,
                loadingDummyData: true
            }
        case show_dummy_data:
            return {
                ...state,
                loadingDummyData: false,
                dummyData: action.payload
            }
        case show_dummy_data_error:
            return {
                ...state,
                loadingDummyData: true,
                dummyDataError: action.payload
            }
        default:
            return state
    }
}