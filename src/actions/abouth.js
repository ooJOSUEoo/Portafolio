import Swal from "sweetalert2";
import { db } from "../Firebase/firebase-config";
import { fileLoad } from "../helpers/fileUpload";
import { loadAbouth } from "../helpers/loadAbouth";
import { types } from "../types/types";
import { finishLoading } from "./ui";


const startAlert = (text, icon='error', title='Error') => {
    return Swal.fire({
        icon: icon,
        title: title,
        text: text
    });
}

export const abouthSetActive = (values) => {
    return (dispatch, getState) => {
        dispatch({
            type: types.abouthSetActive,
            payload: values
        });
    }
}

export const startLoadingAbouth = (uid) => {  ///se ocupa
    return async(dispatch) => {
        const Abouth = await loadAbouth(uid)
        dispatch(setAbouth(Abouth?Abouth : {}));
    }
}
export const setAbouth = (Abouth) => ({  ///se ocupa
    type: types.abouthSet,
    payload: Abouth
});

export const startSetAbouth = (values) => {
    return (dispatch, getState) => {
        const { abouth, abouthActive } = getState().abouth;
        const uid = 'doc'
        const {cv, photo} = abouthActive

        const values = {
            ...abouthActive,
        }
        if (abouth && (abouth.cv || abouth.photo) ) {
            values.cv = abouth.cv;
            values.photo = abouth.photo;
        }
        
        const load = () => {
            if(typeof cv !== 'string' && cv){
                fileLoad(cv, uid, 'abouth/cv', dispatch, (url) => {
                    console.log(url);
                    values.cv = url;
                    saveAbouth(values, uid, dispatch);
                })
            }
            if(typeof photo !== 'string' && photo){
                fileLoad(photo, uid, 'abouth/photo', dispatch, (url) => {
                    console.log(url);
                    values.photo = url;
                    saveAbouth(values, uid, dispatch);
                })
            }
            if(typeof cv === 'string' && typeof photo === 'string'){
                saveAbouth(values, uid, dispatch);
            }
        }
        if(cv || photo){
            load()
        }else{
            saveAbouth(values, uid, dispatch);
        }
    }
}

export const saveAbouth = (values, uid, dispatch) => {
    console.log(values);
    db.collection('abouth').doc(uid).set(values)
        .then(() => {
            dispatch(setAbouth(values));
            startAlert('Abouth saved', 'success', 'Success');
        }).catch(err => {
            startAlert(err.message);
        })
    dispatch(finishLoading())
}