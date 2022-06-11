const INITIAL_STATE = {
    vehicles: [],
    name: '',
    type: '',
    driver: '',
    plateNumber: '',
    secretNumber: '',
    loading: false,
    errorMessage: '',
    tracks: [],
    driverData: [],
    locations: [],
    title: '',
    no_vehicles: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'fetch_vehicles':
            return { ...state, loading: false, errorMessage: '', vehicles: [...action.payload] };
        case 'titleChanged':
            return { ...state, title: action.payload };
        case 'fetch_error':
            return { ...state, errorMessage: action.payload, loading: false };
        case 'createVehicle':
            return {
                ...state, name: '',
                type: '',
                driver: '',
                plateNumber: '',
                secretNumber: '',
                loading: false
            }
        case 'trip_created':
            return {...state, driverData: action.payload, loading: false}
        case 'fetch_tracks':
            return {...state, tracks:[ ...action.payload], loading: false}
        case 'fetch_once':
            return {...state, locations: [...action.payload]}
        case 'loading':
            return {
                ...state, loading: true
            }
        case 'no_vehicles':
                return {...state, no_vehicles: action.payload}
        case 'nameChanged':
            return {
                ...state, name: action.payload
            }
        case 'typeChanged':
            return {
                ...state, type: action.payload
            }
        case 'driverChanged':
            return {
                ...state, driver: action.payload
            }
        case 'plateNumberChanged':
            return {
                ...state, plateNumber: action.payload
            }
        case 'secretNumberChanged':
            return {
                ...state, secretNumber: action.payload
            }
        default:
            return state;
    }
};