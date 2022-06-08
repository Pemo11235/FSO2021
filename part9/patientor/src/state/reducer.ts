import { State } from "./state";
import { Diagnosis, Patient, Entry } from '../types'
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
  | {
      type: 'SET_DIAGNOSIS_CODES'
      payload: Diagnosis[]
    }
  | {
      type: 'ADD_ENTRY'
      payload: {
        patientId: string
        entry: Entry
      }
    }

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientList,
  }
}
export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient,
  }
}

export const addEntry = (patientId: string, entry: Entry): Action => ({
  type: 'ADD_ENTRY',
  payload: {
    patientId,
    entry,
  },
})

export const updatePatient = (patient: Patient): Action => {
  return {
    type: 'UPDATE_PATIENT',
    payload: patient,
  }
}

export const setDiagnosisCodes = (diagnosisCodes: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS_CODES',
    payload: diagnosisCodes,
  }
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
          [updatedContent.id]: updatedContent,
        },
      }
    case 'SET_DIAGNOSIS_CODES':
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({
              ...memo,
              [diagnosis.code]: diagnosis,
            }),
            {}
          ),
          ...state.diagnoses,
        },
      }
    case 'ADD_ENTRY':
      const { patientId, entry } = action.payload
      console.log('1', state.patients[patientId])
      return {
        ...state,
        patients: {
          ...state.patients,
          [patientId]: {
            ...state.patients[patientId],
            entries: [...state.patients[patientId].entries, entry],
          },
        },
      }
    default:
      return state
  }
}
