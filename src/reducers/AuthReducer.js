const INITIAL_STATE = {
    token:'',
    errorMessage: '',
    loading: false,
    role: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "add_error":
            return { ...state, errorMessage: action.payload, loading: false };
        case "signin":
            return { errorMessage: "", token: action.payload, loading: false, role: 'Owner' };
        case "clear_error_message":
            return { ...state, errorMessage: "", loading: false };
        case "signout":
            return { token: null, errorMessage: "", loading: false };
        case "loading":
            return { ...state, loading: true };
        case 'set_role':
            return {...state, role: action.payload};
        default:
            return state;
    }
};