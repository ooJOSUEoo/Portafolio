import { types } from "../types/types"

/* 
    {
        uid: 'd5sf4sd6v5df5v4fd5v',
        name: 'John Doe',
        email: '...@gmail.com',
        photoURL: 'https://...'
    }
*/

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
                email: action.payload.email,
                photoURL: action.payload.photoURL
            }
        case types.logout:
            return {}
            
        default:
            return state
    }
}