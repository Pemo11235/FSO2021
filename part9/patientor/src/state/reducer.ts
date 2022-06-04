import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: 'SET_PATIENT_LIST'
      payload: Patient[]
    }
  | {
      type: 'ADD_PATIENT'
      payload: Patient
    }
  | {
      type: 'UPDATE_PATIENT'
      payload: Patient
    }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      }
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      }
    case 'UPDATE_PATIENT':
      const toUpdate = state.patients[action.payload.id]
      toUpdate.name = action.payload.name
      toUpdate.occupation = action.payload.occupation
      toUpdate.ssn = action.payload.ssn
      toUpdate.gender = action.payload.gender
      toUpdate.dateOfBirth = action.payload.dateOfBirth

      delete state.patients[action.payload.id]

      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: toUpdate,
        },
      }

    default:
      return state
  }
}
