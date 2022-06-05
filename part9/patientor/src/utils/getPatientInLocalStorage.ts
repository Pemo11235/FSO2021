import { Patient } from '../types'

export const getPatientInLocalStorage = (
  patientID: string | undefined
): Patient | null => {
  if (!patientID) return null
  const localCachedPatient = localStorage.getItem(`patient-${patientID}`)
  return localCachedPatient ? (JSON.parse(localCachedPatient) as Patient) : null
}
