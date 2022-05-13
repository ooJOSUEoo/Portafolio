import Swal from "sweetalert2";
import { db } from "../Firebase/firebase-config";
import { deleteFile, fileLoad } from "../helpers/fileUpload";
import { loadProjects } from "../helpers/loadProjects";
import { types } from "../types/types";
import { finishLoading } from "./ui";


const startAlert = (text, icon='error', title='Error') => {
    return Swal.fire({
        icon: icon,
        title: title,
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

export const startSetProject = () => {
    return (dispatch, getState) => {
        const { isNewProject, projectActive } = getState().projects;
        const {image} = projectActive
        let id


        const values = {
            ...projectActive,
        }

        if (!projectActive.id) {
            id = db.collection('projects/').doc().id
         }else id = projectActive.id
        
        const load = () => {
            if(typeof image !== 'string' && image){
                fileLoad(image, id, 'projects/image', dispatch, (url) => {
                    console.log(url);
                    values.image = url;
                    saveProject(values, id, dispatch, isNewProject);
                })
            }
        }
        if(image && typeof image !== 'string'){
            load()
        }else{
            saveProject(values, id, dispatch, isNewProject);
        }
    }
}

export const saveProject = (values, id, dispatch, isNewProject) => {
    console.log(isNewProject);
    isNewProject ? (
        db.collection('projects/').doc(id).set(values)
        .then(() => {
            dispatch(setNewProject(values));
            startAlert('Proyecto guardado', 'success', 'Proyecto guardado')
            }).catch(err => {
                startAlert(err.message);
            })
    ) : (
        db.collection('projects/').doc(id).update(values)
        .then(() => {
            console.log(values);
            dispatch(setEditProject(values));
            startAlert('Proyecto guardado', 'success', 'Proyecto guardado')
        }).catch(err => {
            startAlert(err.message);
        })
    )
    dispatch(finishLoading())
}

export const setNewProject = (values) => ({
    type: types.projectAdd,
    payload: values
});

export const activeEditProject = (values) => ({
    type: types.projectChangeToEdit,
});

export const setEditProject = (values) => ({
    type: types.projectUpdate,
    payload: values
});

export const changeToNewProject = () => ({
    type: types.projectChangeToNew,
})

export const deleteProject = (id) => {
    return (dispatch, getState) => {
        const { projects } = getState().projects;
        const project = projects.filter(project => project.id === id);
        const { image } = project[0];
        if (image) {
            deleteFile(id, 'projects/image')
        } 
        deleteProjectDB(id,dispatch);
    }
}

export const deleteProjectDB = (id,dispatch) => {
    db.collection('projects/').doc(id).delete()
    .then(() => {
        dispatch(deleteProjectSuccess(id))
        startAlert('Proyecto eliminado', 'success', 'Proyecto eliminado')
    }).catch(err => {
        startAlert(err.message);
    })
}

export const deleteProjectSuccess = (id) => ({
    type: types.projectDelete,
    payload: id
})