import 'react-native-get-random-values';
import { getDatabase, ref, onValue, push, remove, get } from 'firebase/database';
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from 'uuid';
import { navigate } from "../navigationRef";

export const nameChanged = (text) => {
    return (dispatch) => {
        dispatch({
            type: 'nameChanged',
            payload: text
        })
    };
};
export const driverChanged = (text) => {
    return (dispatch) => {
        dispatch({
            type: 'driverChanged',
            payload: text
        })
    };
};
export const typeChanged = (text) => {
    return (dispatch) => {
        dispatch({
            type: 'typeChanged',
            payload: text
        })
    };
};
export const titleChanged = (text) => {
    return (dispatch) => {
        dispatch({
            type: 'titleChanged',
            payload: text
        })
    };
};
export const plateNumberChanged = (text) => {
    return (dispatch) => {
        dispatch({
            type: 'plateNumberChanged',
            payload: text
        })
    };
};
export const secretNumberChanged = (text) => {
    return (dispatch) => {
        dispatch({
            type: 'secretNumberChanged',
            payload: text
        })
    };
};

export const createVehicle = (name, type, driver, plateNumber, secretNumber) => {
    return async (dispatch) => {
        dispatch({ type: 'loading' });
        const auth = getAuth();
        const userStorage = await AsyncStorage.getItem("user");
        let currentUser;

        if (userStorage) {
            currentUser = JSON.parse(userStorage);
        } else {
            currentUser = auth.currentUser;
        }

        const db = getDatabase();
        console.log(currentUser);
        const reference = ref(db, `tracker/${currentUser.uid}/vehicles`);
        push(reference, { _id: uuidv4(), name, type, driver, plateNumber, tracks: {}, secretNumber });
        dispatch({ type: 'createVehicle' });
        navigate("Vehicles");
    }
}

export const removeVehicle = (id) => {
    return async (dispatch) => {
        const auth = getAuth();
        const db = getDatabase();
        const userStorage = await AsyncStorage.getItem("user");
        let currentUser;

        if (userStorage) {
            currentUser = auth.currentUser || JSON.parse(userStorage);
        } else {
            currentUser = auth.currentUser;
        }
        const reference = ref(db, `tracker/${currentUser.uid}/vehicles/${id}`);
        remove(reference);
        navigate("Vehicles");
    }
}

export const fetchVehicles = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'loading' });
            const auth = getAuth();
            const userStorage = await AsyncStorage.getItem("user");
            let currentUser;

            if (userStorage) {
                currentUser = auth.currentUser || JSON.parse(userStorage);
            } else {
                currentUser = auth.currentUser;
            }


            const db = getDatabase();

            const reference = ref(db, `tracker/${currentUser.uid}/vehicles`);
            const vehiclesArr = [];

            await get(reference).then((snapshot) => {
                console.log('On fetch first 1');
                if (snapshot.exists()) {
                    console.log('On fetch first 2', snapshot.val());
                    snapshot.forEach((childSnapShot) => {
                        vehiclesArr.push({
                            vehicleKey: childSnapShot.key,
                            data: childSnapShot.val()
                        });
                        dispatch({ type: 'fetch_vehicles', payload: vehiclesArr });
                    })
                    if (!vehiclesArr.length) {
                        console.log('On fetch first 3');
                        setTimeout(navigate("Vehicles"), 500);
                    }
                } else {
                    console.log("No data available");
                    dispatch({type: 'no_vehicles', payload: 'no_vehicles'})
                    dispatch({ type: 'fetch_vehicles', payload: [] });
                }
            }).catch((err) => {
                console.log(err);
                dispatch({ type: 'fetch_error' });
            });
        } catch (err) {
            alert(error.message + 'Please reload 2.');
            console.log(err);
        }
    }
};



export const createTrack = (title, plateNumber, secretNumber) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'loading' });

            const db = getDatabase();

            const referenceTracks = ref(db, `tracker/`);
            let tracks = [];
            await get(referenceTracks).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log('On fetch first', snapshot.val());
                    snapshot.forEach((childSnapShot) => {
                        tracks.push({
                            usersId: childSnapShot.key,
                            data: childSnapShot.val()
                        });
                        dispatch({ type: 'fetch_track', payload: tracks });
                    })
                    if (!tracks.length) {
                        setTimeout(() => console.log('hello there'), 5000);
                    }
                } else {
                    alert("No vehicle data available!");
                    dispatch({ type: 'fetch_track', payload: [] });
                }
            }).catch((error) => {
                alert(error.message);

                console.error(error);
                dispatch({ type: 'fetch_error', payload: error.message });
            });



            console.log(tracks)
            if (tracks.length) {

                console.log('snap', tracks[0].data.vehicles);
                console.log('snap', tracks[0].usersId);

                let vehicleObject = [];
                tracks.map((arr) => {
                    const vehicles = arr.data.vehicles;
                    Object.entries(vehicles).forEach(([key, vehicle]) => {
                        if (vehicle.plateNumber == plateNumber && vehicle.secretNumber == secretNumber) {
                            console.log('Found one', vehicle)
                            console.log(arr);
                            vehicleObject.push({ usersId: arr.usersId, key, ...vehicle });

                        }
                    })
                });

                if (vehicleObject.length) {
                    console.log('filtered', vehicleObject[0]);
                    // console.log('filtered',vehicleObject);
                    const reference = ref(db, `tracker/${vehicleObject[0].usersId}/vehicles/${vehicleObject[0].key}/tracks/`);
                    const keyRef = await push(reference, { title: title, locations: {} });
                    console.log(keyRef);
                    const trackArray = [];
                    trackArray.push({ trackKey: keyRef.key, title, ...vehicleObject[0] });
                    dispatch({ type: 'trip_created', payload: trackArray });
                    navigate('TrackCreate', { driverData: { ...trackArray[0] } });
                } else {
                    alert('Incorrect Plate number or secret code.');
                    dispatch({ type: 'trip_created', payload: [] });
                }

            } else {

                setTimeout(() => { console.log('please') }, 500);

            }
        } catch (err) {
            console.error(err);
        }

    }
};

export const fetchTracks = (usersId, vehicleKey) => {
    return (dispatch) => {
        try {
            dispatch({ type: 'loading' });
            const db = getDatabase();
            const reference = ref(db, `tracker/${usersId}/vehicles/${vehicleKey}/tracks`);
            const tracksArr = [];

            onValue(reference, (snapshot) => {
                if (snapshot.val()) {
                    snapshot.forEach((childSnapShot) => {
                        tracksArr.push({
                            key: childSnapShot.key,
                            data: childSnapShot.val()
                        });
                    })

                    dispatch({ type: 'fetch_tracks', payload: tracksArr });
                }
            });
        } catch (err) {
            console.error(err);
        }
    }
}

export const fetchWithQuery = () => {
    return async (dispatch) => {
        const query = await AsyncStorage.getItem('trackQuery');
        console.log(query);
        try {
            //dispatch({ type: 'loading' });
            const auth = getAuth();
            const db = getDatabase();

            const reference = ref(db, query);
            const arr = [];

            await get(reference).then((snapshot) => {
                if (snapshot.val().locations) {
                    console.log(snapshot.val());
                    Object.entries(snapshot.val().locations).forEach(([key, location]) => {
                        arr.push(location);
                    })
                    dispatch({ type: 'fetch_once', payload: arr });
                }
            }).catch((error) => {
                alert(error.message);
                console.error(error);
                dispatch({ type: 'fetch_error', payload: error.message });
            });
        } catch (err) {
            console.error(err);
        }
    }
};