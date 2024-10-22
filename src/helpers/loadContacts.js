import { db } from "../Firebase/firebase-config";


export const loadContacts = async (uid) => {

    const contactsSnap = await db.collection(`contact/`).get();
    const contacts = [];
    
    contactsSnap.forEach(snapHijo => {
        contacts.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });
    return contacts
}