import Swal from "sweetalert2";
import { db } from "../Firebase/firebase-config";
import { deleteFile, fileLoad } from "../helpers/fileUpload";
import { loadLanguages } from "../helpers/loadLanguages";
import { types } from "../types/types";
import { finishLoading } from "./ui";


const startAlert = (text, icon='error', title='Error') => {
    return Swal.fire({
        icon: icon,
        title: title,
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


export const startSetLanguage = () => {
    return (dispatch, getState) => {
        const {  isNewLanguage, languageActive } = getState().languages;
        const {image} = languageActive
        let id


        const values = {
            ...languageActive,
        }
        if (!languageActive.id) {
           id = db.collection('languages/').doc().id
        }else id = languageActive.id
        const load = () => {
            if(typeof image !== 'string' && image){
                fileLoad(image, id, 'languages/image', dispatch, (url) => {
                    console.log(url);
                    values.image = url;
                    saveLanguage(values, id, dispatch, isNewLanguage);
                })
            }
        }
        if(image && typeof image !== 'string'){
            load()
        }else{
            saveLanguage(values, id, dispatch, isNewLanguage);
        }
        
    }
}

export const saveLanguage = (values, id, dispatch, isNewLanguage) => {
    isNewLanguage ? (
        db.collection('languages/').doc(id).set(values)
            .then(() => {
                dispatch(setNewLanguage(values))

                startAlert('Lenguaje guardado correctamente', 'success', 'Lenguaje guardado')
            }).catch(err => {
                startAlert(err.message);
            })
    ) : (
        db.collection('languages/').doc(id).update(values)
            .then(() => {
                console.log(values);
                dispatch(setEditLanguage(values))

                startAlert('Lenguaje actualizado correctamente', 'success', 'Lenguaje actualizado')
            }).catch(err => {
                startAlert(err.message);
            })
    )

    dispatch(finishLoading())
}

export const setNewLanguage = (values) => ({
    type: types.lenguajeAdd,
    payload: values
});

export const activeEditLanguage = (values) => ({
    type: types.lenguajeChangeToEdit,
});

export const setEditLanguage = (values) => ({
    type: types.lenguajeUpdate,
    payload: values
})

export const changeToNewLanguage = () => ({
    type: types.lenguajeChangeToNew,
})

export const deleteLanguage = (id) => {
    return (dispatch, getState) => {
        const { languages } = getState().languages;
        const language = languages.filter(language => language.id === id);
        const { image } = language[0];
        if (image) {
            deleteFile(id, 'languages/image')
        } 
        deleteLanguageDB(id,dispatch);
    }
}

export const deleteLanguageDB = (id,dispatch) => {
    db.collection('languages/').doc(id).delete()
    .then(() => {
        dispatch(deleteLanguageSuccess(id))
        startAlert('Lenguaje eliminado correctamente', 'success', 'Lenguaje eliminado')
    }).catch(err => {
        startAlert(err.message);
    })
}

export const deleteLanguageSuccess = (id) => ({
    type: types.lenguajeDelete,
    payload: id
})