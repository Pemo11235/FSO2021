import { v1 as uuid } from "uuid";
import {
  NonSensitivePatientEntry,
  PatientEntry,
  NewPatientEntry,
} from "../types";
import patientsData from "../data/patients";

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

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const id = uuid();

  const newPatientEntry: PatientEntry = {
    id,
    ...entry,
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  const patientFound = patientsData.find((p) => p.id === id);
  return patientFound;
};

export default { getEntries, getNonSensitiveEntries, addPatient, findById };
