import { db } from "../Firebase/firebase-config";


export const loadAbouth = async (uid) => {

    const abouthSnap = await db.collection(`abouth/`).get();
    const abouth = [];
    
    abouthSnap.forEach(snapHijo => {
        abouth.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });

    return abouth;
}