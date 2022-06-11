import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { navigate } from "../navigationRef";
import { changeName } from "./LocationActions";


export const setRole = (role) => {
    return async (dispatch) => {
       console.log(role);
        if (role == 'trackee') {
            dispatch({ type: "set_role", payload: role });
            navigate("AddTracks");
        } else {
            dispatch({ type: "set_role", payload: role });
        }
    }
};

// export const changeRole = ()=>{
//     return async (dispatch)=>{
//         const role = await AsyncStorage.getItem('role');
//         if (role == 'trackee'){ 
//             AsyncStorage.setItem('role', role);
//             dispatch({type: 'set_role', payload: role});
//             tryLocalSignin();
//         } else {
//             AsyncStorage.setItem('role', role);
//             dispatch({ type: 'set_role', payload: role });
//             navigate('AddTracks');
//         }
//     }
// }

export const tryLocalSignin = () => {
    return async (dispatch) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            dispatch({ type: "signin", payload: token });
            navigate("Vehicles");
        } else {
            navigate("Signup");
        }
    }
};

export const clearErrorMessage = () => {
    return (dispatch) => {
        dispatch({ type: "clear_error_message" });
    }
};

export const signup = ({ email, password }) => {
    return async (dispatch) => {
        const auth = getAuth();
        dispatch({
            type: "loading"
        })
        console.log("loading");
        await createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {
                const user = response.user;
               
                dispatch({ type: "signin", payload: user.uid });
                // ...
                AsyncStorage.setItem("token", user.uid);
                AsyncStorage.setItem("user", JSON.stringify(user));
                navigate("Vehicles");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                dispatch({
                    type: "add_error",
                    payload: errorMessage,
                });
            });
    }
};




export const signin = ({ email, password }) => {
    return async (dispatch) => {
        console.log("loading sign in");
        const auth = getAuth();
        let user;
        await signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                // Signed in 
                user = response.user;
                AsyncStorage.setItem("token", user.uid);
            AsyncStorage.setItem("user", JSON.stringify(user));
               
                dispatch({ type: "signin", payload: user.uid });
                navigate("Vehicles");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                dispatch({
                    type: "add_error",
                    payload: errorMessage,
                });
            });
    }
};

export const signout = () => {
    return async (dispatch) => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        dispatch({ type: "signout" });
        navigate("loginFlow");
    }
};