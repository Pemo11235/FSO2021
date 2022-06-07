import { v1 as uuid } from "uuid";
import {
  NonSensitivePatientEntry,
  PatientEntry,
  NewPatientEntry,
  Entry,
  NewEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
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

const getPatientEntries = (id: string): Entry[] => {
  const patientFound = findById(id);
  if (patientFound) {
    return patientFound.entries;
  }
  return [];
};

const addEntryToPatient = (id: string, entry: NewEntry): Entry | {} => {
  const patientFound = findById(id);
  const { date, description, specialist, type } = entry;
  if (!date || !description || !specialist || !type) {
    throw new Error("Missing entry information");
  }
  if (patientFound) {
    const newEntry: Entry = {
      id: uuid(),
      ...entry,
    };
    switch (entry.type) {
      case "Hospital":
        patientFound.entries.push(newEntry as HospitalEntry);
        return newEntry;
      case "OccupationalHealthcare":
        if (!entry.employerName) {
          throw new Error("Missing employer name");
        } else {
          patientFound.entries.push(newEntry as OccupationalHealthcareEntry);
          return newEntry;
        }
      case "HealthCheck":
        if (!entry.healthCheckRating) {
          throw new Error("Missing health check rating");
        } else {
          patientFound.entries.push(newEntry as HealthCheckEntry);
          return newEntry;
        }
      default:
        return {};
    }
  }
  return {};
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  getPatientEntries,
  addEntryToPatient,
};
