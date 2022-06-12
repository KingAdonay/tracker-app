import { getDatabase, ref, onValue, set, push, orderByChild, equalTo, query, get } from 'firebase/database';
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const changeName = name => {
    return (dispatch) => {
        dispatch({ type: 'change_name', payload: name });
    }
};

export const startRecording = () => {
    return (dispatch) => {
        dispatch({ type: 'start_recording' });
    }

};
export const stopRecording = () => {
    return (dispatch) => {
        dispatch({ type: 'stop_recording' });
    };
}

export const addTrack = (title) => {
    return (dispatch) => {
        const auth = getAuth();
        const currentUser = auth.currentUser || AsyncStorage.getItem("user");
        console.log(currentUser);

        //console.log("loc:", location);

        const db = getDatabase();
        const reference = query(ref(db, `tracker/${currentUser.uid}/vehicles/`), orderByChild('secretNumber'), equalTo('1233'));
        console.log(reference.toString());
        // const refAddTrack = ref(db, `tracker/${currentUser.uid}/vehicles/${}/tracks/`);
        // push(refAddTrack, {
        //     title: title,
        //     locations: {}
        // });
        get(reference).then(snapshow => {
            console.log(snapshow.val())
        }).catch(err => console.error(err));

        dispatch({ type: 'trackAdded' });
    }
}

export const addLocation = (locationNew, recording, query) => {
    return async (dispatch) => {
        dispatch({ type: 'add_current_location', payload: locationNew });

        if (recording) {
            dispatch({ type: 'add_location', payload: locationNew });
            try {
                const auth = getAuth();
               // const currentUser = auth.currentUser || await AsyncStorage.getItem("user");
                const db = getDatabase();
                const reference = ref(db, query);
                push(reference, { ...locationNew });
            } catch (err) {
                console.error(err);
            }

        }
    }

};

export const fetchLocations = (vehicleKey, key) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'loading' });
            const auth = getAuth();
            const localUser = await AsyncStorage.getItem("user");
            const currentUser = auth.currentUser || JSON.parse(localUser);

            const db = getDatabase();

            const reference = ref(db, `tracker/${currentUser.uid}/vehicles/${vehicleKey}/tracks/${key}`);

            try {
                onValue(reference, (snapshot) => {
                    if (snapshot.val().locations) {
                        console.log(snapshot.val())
                        let locationArr = [];
                        Object.entries(snapshot.val().locations).forEach(([key, location]) => {
                            locationArr.push(location);
                        })
                        dispatch({ type: 'fetch_location', payload: locationArr });
                    }
                });
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            console.error(err);
        }
    }

};

export const reset = () => {
    return (dispatch => {
        dispatch({ type: 'reset' });
    })
};
