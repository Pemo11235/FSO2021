import express from "express";
import diagnosesService from "../services/diagnosesService";
import { DiagnoseEntry } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  const diagnoses = diagnosesService.getEntries();
  if (diagnoses === undefined) {
    res.status(404).send("Not found");
  } else {
    res.status(200).json(diagnoses);
  }
});

router.post("/", (req, res) => {
  try {
    const diagnoseEntry = req.body as DiagnoseEntry;
    const diagnose = diagnosesService.addDiagnoses(diagnoseEntry);
    res.json(diagnose);
  } catch (e: unknown) {
    let message = "Something went wrong";
    if (e instanceof Error) {
      message += `: ${e.message}`;
    }
    res.status(400).send(message);
  }
});

export default router;
