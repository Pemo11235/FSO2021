import express from "express";
import patientsService from "../services/patientsService";
import { NonSensitivePatientEntry, NewEntry } from "../types";
import toNewPatientEntry from "../utils/patientsUtils";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients: NonSensitivePatientEntry[] =
    patientsService.getNonSensitiveEntries();
  if (patients === undefined) {
    res.status(404).send("Not found");
  } else {
    res.status(200).json(patients);
  }
});

router.get("/:id", (req, res) => {
  const patient = patientsService.findById(req.params.id);
  if (patient) {
    res.status(200).json(patient);
  } else {
    res.status(404).send("Not found");
  }
});
router.get("/:id/entries", (req, res) => {
  const entries = patientsService.getPatientEntries(req.params.id);
  if (entries) {
    res.status(200).json(entries);
  } else {
    res.status(404).send("Not found");
  }
});
router.post("/:id/entries", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newEntry = req.body as NewEntry;
  const { id } = req.params;
  const entryInserted = patientsService.addEntryToPatient(id, newEntry);
  if (entryInserted) {
    res.status(200).json(entryInserted);
  } else {
    res.status(400).send("Not valid");
  }
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e: unknown) {
    let message = "Something went wrong";
    if (e instanceof Error) {
      message += `: ${e.message}`;
    }
    res.status(400).send(message);
  }
});

export default router;
