import { types } from "../types/types";

/*

    {
        contacts: [],
        isNewContact: false,
        contactActive: {}
    }

*/

const initialState = {
    contacts: [],
    isNewContact: true,
    contactActive: {}
};

export const contactReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.contactLoad:
            return {
                ...state,
                contacts: action.payload
            }

        case types.contactAdd:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            }
        
        case types.contactUpdate:
            return {
                ...state,
                contacts: state.contacts.map(
                    contact => {
                        if (contact.id === action.payload.id) {
                            return action.payload
                        } else {
                            return contact
                        }
                    }
                )

            }

        case types.contactDelete:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            }

        case types.contactSetActive:
            return {
                ...state,
                contactActive: action.payload
            }

        case types.contactChangeToNew:
            return {
                ...state,
                isNewContact: true,
                contactActive: {
                    ...state.contactActive,
                    id: null
                }
            }

        case types.contactChangeToEdit:
            return {
                ...state,
                isNewContact: false
            }
        
        default:
            return state
    }
}