import { dummyReducer } from './dummyReducer';
import { videoReducer } from './videoReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    dummyReducer,
    videoReducer
})