import Swal from "sweetalert2";
import { firebase } from "../Firebase/firebase-config";
import { types } from "../types/types";


const startAlert = (text, icon='error', title='Error') => {
    return Swal.fire({
        icon: icon,
        title: title,
        text: text
    });
}

export const startLoginWithEmailPassword = (email, password) => {
    return (dispatch) => {
        //dispatch(startLoading());
        
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({user}) => {
            //user.sendEmailVerification()
            dispatch(login(user.uid, user.displayName, user.email, user.photoURL));
            //dispatch(finishLoading());
        })
        .catch(e => {
            //dispatch(finishLoading());
            startAlert(e.message);
        });
            
    }
}

export const login = (uid, displayName, email, photoURL) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
        email,
        photoURL
    }
})

export const Logout = () => {
    return (dispatch) => {
        firebase.auth().signOut()
        .then(() => {
            dispatch({
                type: types.logout
            });
        })
        .catch(e => {
            startAlert(e.message);
        })
    }
}