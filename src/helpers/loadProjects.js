import { db } from "../Firebase/firebase-config";


export const loadProjects = async (uid) => {

    const projectsSnap = await db.collection(`projects/`).get();
    const projects = [];
    
    projectsSnap.forEach(snapHijo => {
        projects.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });
    return projects
}