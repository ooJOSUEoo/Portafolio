import Swal from "sweetalert2";
import { db } from "../Firebase/firebase-config";
import { fileLoad } from "../helpers/fileUpload";
import { loadContacts } from "../helpers/loadContacts";
import { types } from "../types/types";
import { finishLoading } from "./ui";


const startAlert = (text) => {
    return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: text
    });
}

export const contactsSetActive = (values) => {
    return (dispatch, getState) => {
        dispatch({
            type: types.socialSetActive,
            payload: values
        });
    }
}

export const startLoadingContacts = (uid) => {  ///se ocupa
    return async(dispatch) => {
        const contacts = await loadContacts(uid)
        dispatch(setContacts(contacts));
    }
}
export const setContacts = (contacts) => ({  ///se ocupa
    type: types.socialLoad,
    payload: contacts
});

export const startSetContact = (values) => {
    return (dispatch, getState) => {
        const {  socialActive } = getState().socials;
        
        db.collection('social/').doc().set(socialActive)
        .then(() => {
            dispatch(finishLoading());
            dispatch({
                type: types.socialAdd,
                payload: socialActive
            })
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Contact saved'
            });
        }
        ).catch(() => {
            startAlert('Error saving contact');
        }
        );
    }
}