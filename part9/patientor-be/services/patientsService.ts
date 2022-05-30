import patientsData from "../data/patients";
import { NonSensitivePatientEntry, PatientEntry } from "../types";

const getEntries = (): PatientEntry[] => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: PatientEntry) => {
  patientsData.push(patient);
};

export default { getEntries, getNonSensitiveEntries, addPatient };
