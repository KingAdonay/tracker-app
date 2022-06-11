const INITIAL_STATE = {
  currentLocation: null,
  recording: false,
  locations: [],
  name: '',
  trackAdded: false,
  fetchedLocation: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'add_current_location':
      return { ...state, currentLocation: action.payload };
    case 'start_recording':
      return { ...state, recording: true };
    case 'stop_recording':
      return { ...state, recording: false };
    case 'add_location':
      return { ...state, locations: [...state.locations, action.payload] };
    case 'fetch_location':
      return { ...state, fetchedLocation: [...action.payload] }
    case 'change_name':
      return { ...state, name: action.payload };
    case 'reset':
      return { ...state, name: '', locations: [] };
    case 'trackAdded':
      return { ...state, trackAdded: true }
    default:
      return state;
  }
};