import { State } from "./state";
import { Patient } from "../types";
import { updatePatientState } from '../utils/updatePatientState'

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
            (memo, patient) => ({
              ...memo,
              [patient.id]: { ...state.patients[patient.id], ...patient },
            }),
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
      const updatedContent = action.payload

      return {
        ...state,
        patients: {
          ...state.patients,
          [updatedContent.id]: updatePatientState(
            updatedContent,
            state.patients[updatedContent.id]
          ),
        },
      }

    default:
      return state
  }
}
