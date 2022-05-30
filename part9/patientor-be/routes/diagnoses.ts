import express from "express";
import diagnosesService from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_req, res) => {
  const diagnoses = diagnosesService.getEntries();
  if (diagnoses === undefined) {
    res.status(404).send("Not found");
  } else {
    res.status(200).json(diagnoses);
  }
});

router.post("/", (_req, res) => {
  res.send("Add a new diagnosis");
});

export default router;
