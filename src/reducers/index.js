import {combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import LocationReducer from './LocationReducer';
import TrackReducer from './TrackReducer';

export default combineReducers({
    auth: AuthReducer,
    location: LocationReducer,
    track: TrackReducer
});