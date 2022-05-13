import Swal from "sweetalert2";
import { db } from "../Firebase/firebase-config";
import { loadContacts } from "../helpers/loadContacts";
import { types } from "../types/types";
import { finishLoading } from "./ui";


const startAlert = (text, icon='error', title='Error') => {
    return Swal.fire({
        icon: icon,
        title: title,
        text: text
    });
}

export const contactsSetActive = (values) => {
    return (dispatch, getState) => {
        dispatch({
            type: types.contactSetActive,
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
    type: types.contactLoad,
    payload: contacts
});

export const startSetContact = (id, isNewContact) => {
    return (dispatch, getState) => {
        const {  contactActive } = getState().contacts;
        
        isNewContact ?
        (
            db.collection('contact/').doc().set(contactActive)
            .then(() => {
                dispatch(finishLoading());
                dispatch({
                    type: types.contactAdd,
                    payload: contactActive
                })
                startAlert('Contacto agregado correctamente', 'success', 'Contacto agregado');
            }
            ).catch(() => {
                startAlert('Error saving contact');
            })
        ):
        (
            db.collection('contact/').doc(id).set(contactActive)
            .then(() => {
                dispatch(finishLoading());
                dispatch(setEditContact(contactActive));
                startAlert('Contacto editado correctamente', 'success', 'Contacto editado');
            }
            ).catch(() => {
                startAlert('Error saving contact');
            })
                    
        )
    }
}

export const activeEditContact = () => ({
    type: types.contactChangeToEdit,
});

export const setEditContact = (values) => ({
    type: types.contactUpdate,
    payload: values
});

export const changeToNewContact = () => ({
    type: types.contactChangeToNew,
})

export const deleteContactDB = (id) => {
    return (dispatch) => {
        db.collection('contact/').doc(id).delete()
        .then(() => {
            dispatch(deleteContactSuccess(id))
            startAlert('Contacto eliminado correctamente', 'success', 'Contacto eliminado');
        }).catch(err => {
            startAlert(err.message);
        })
    }
}

export const deleteContactSuccess = (id) => ({
    type: types.contactDelete,
    payload: id
})