import { set_percentage } from "../../utils/actionTypes";

const initState = {
    percentage: 0
}

interface I1 {
    percentage: number
}

type Action = { type: string, payload: string }

export const videoReducer = (state: I1 = initState, action: Action) => {
    switch (action.type) {
        case set_percentage:
            return {
                ...state,
                percentage: action.payload
            }
        default:
            return state;
    }
}