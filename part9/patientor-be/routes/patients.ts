import express from "express";
import patientsService from "../services/patientsService";
import { NonSensitivePatientEntry } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients: NonSensitivePatientEntry[] =
    patientsService.getNonSensitiveEntries();
  const patientsToJson = JSON.stringify(patients);
  if (patients === undefined) {
    res.status(404).send("Not found");
  } else {
    res.status(200).send(patientsToJson);
  }
});

router.post("/", (_req, res) => {
  res.send("Hello World!");
});

export default router;
