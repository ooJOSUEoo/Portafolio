import { db } from "../Firebase/firebase-config";


export const loadLanguages = async (uid) => {

    const languagesSnap = await db.collection(`languages/`).get();
    const languages = [];
    
    languagesSnap.forEach(snapHijo => {
        languages.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });
    return languages
}