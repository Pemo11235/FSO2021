import { Patient } from '../types'

export const updatePatientState = (
  newPatientInfo: Patient,
  oldPatientInfo: Patient
) => {
  const patient = {
    ...oldPatientInfo,
    ...newPatientInfo,
  }
  return patient
}
