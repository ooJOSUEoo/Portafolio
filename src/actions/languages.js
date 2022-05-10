import Swal from "sweetalert2";
import { db } from "../Firebase/firebase-config";
import { fileLoad } from "../helpers/fileUpload";
import { loadLanguages } from "../helpers/loadLanguages";
import { types } from "../types/types";
import { finishLoading } from "./ui";


const startAlert = (text) => {
    return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: text
    });
}

export const languagesSetActive = (values) => {
    return (dispatch, getState) => {
        dispatch({
            type: types.lenguajeSetActive,
            payload: values
        });
    }
}

export const startLoadingLanguages = (uid) => {  ///se ocupa
    return async(dispatch) => {
        const languages = await loadLanguages(uid)
        dispatch(setLanguages(languages));
    }
}
export const setLanguages = (languages) => ({  ///se ocupa
    type: types.languagesLoad,
    payload: languages
});


export const startSetLanguage = (values) => {
    return (dispatch, getState) => {
        const {  languageActive } = getState().languages;
        const {image} = languageActive


        const values = {
            ...languageActive,
            image: ''
        }
        const {id: idDoc} = db.collection('languages/').doc()
        
        const load = () => {
            if(typeof image !== 'string' && image){
                fileLoad(image, idDoc, 'languages/image', dispatch, (url) => {
                    console.log(url);
                    values.image = url;
                    saveLanguage(values, idDoc, dispatch);
                })
            }
        }
        if(image){
            load()
        }else{
            saveLanguage(values, idDoc, dispatch);
        }
    }
}

export const saveLanguage = (values, idDoc, dispatch) => {
    console.log(values);
    db.collection('languages/').doc(idDoc).set(values)
        .then(() => {
            dispatch(setNewLanguage(values));
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Abouth updated successfully!'
            });
        }).catch(err => {
            startAlert(err.message);
        })
    dispatch(finishLoading())
}

export const setNewLanguage = (values) => ({
    type: types.lenguajeAdd,
    payload: values
});