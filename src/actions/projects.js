import Swal from "sweetalert2";
import { db } from "../Firebase/firebase-config";
import { fileLoad } from "../helpers/fileUpload";
import { loadProjects } from "../helpers/loadProjects";
import { types } from "../types/types";
import { finishLoading } from "./ui";


const startAlert = (text) => {
    return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: text
    });
}

export const projectsSetActive = (values) => {
    return (dispatch, getState) => {
        dispatch({
            type: types.projectSetActive,
            payload: values
        });
    }
}

export const startLoadingProjects = (uid) => {  ///se ocupa
    return async(dispatch) => {
        const projects = await loadProjects(uid)
        dispatch(setProjects(projects));
    }
}
export const setProjects = (projects) => ({  ///se ocupa
    type: types.projectsLoad,
    payload: projects
});

export const startSetProject = (values) => {
    return (dispatch, getState) => {
        const {  projectActive } = getState().projects;
        const {image} = projectActive


        const values = {
            ...projectActive,
            image: ''
        }
        const {id: idDoc} = db.collection('projects/').doc()
        
        const load = () => {
            if(typeof image !== 'string' && image){
                fileLoad(image, idDoc, 'projects/image', dispatch, (url) => {
                    console.log(url);
                    values.image = url;
                    saveProject(values, idDoc, dispatch);
                })
            }
        }
        if(image){
            load()
        }else{
            saveProject(values, idDoc, dispatch);
        }
    }
}

export const saveProject = (values, idDoc, dispatch) => {
    console.log(values);
    db.collection('projects/').doc(idDoc).set(values)
        .then(() => {
            dispatch(setNewProject(values));
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

export const setNewProject = (values) => ({
    type: types.projectAdd,
    payload: values
});