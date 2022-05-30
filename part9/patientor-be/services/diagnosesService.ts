import diagnosesData from "../data/diagnoses";
import { DiagnoseEntry } from "../types";

const getEntries = (): DiagnoseEntry[] => {
  return diagnosesData;
};

const addDiagnoses = (diagnose: DiagnoseEntry) => {
  diagnosesData.push(diagnose);
};

export default { getEntries, addDiagnoses };
