import { types } from "../types/types";

/*

    {
        proyects: [],
        isNewProyect: false,
        proyectActive: {}
    }

*/


export const proyectReducer = (state = {}, action) => {
    switch (action.type) {
        case types.proyectoAdd:
            return {
                ...state,
                proyects: [...state.proyects, action.payload]
            }
        
        case types.proyectoUpdate:
            return {
                ...state,
                proyects: state.proyects.map(
                    proyect => proyect.id === action.payload.id ? action.payload.proyect : proyect
                )
            }

        case types.proyectoDelete:
            return {
                ...state,
                proyects: state.proyects.filter(proyect => proyect.id !== action.payload)
            }

        case types.proyectoSetActive:
            return {
                ...state,
                proyectActive: state.proyects.find(proyect => proyect.id === action.payload)
            }

        case types.proyectoChangeToNew:
            return {
                ...state,
                isNewProyect: true
            }

        case types.proyectoChangeToEdit:
            return {
                ...state,
                isNewProyect: false
            }
        
        default:
            return state
    }
}