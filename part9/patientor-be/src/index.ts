import express from "express";
import cors from "cors";
import { diagnosesRouter, patientsRouter } from "../routes";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;
const baseUrl = `/api`;

app.get(`${baseUrl}/ping`, (_req, res) => {
  res.status(200).send("pong");
});

app.use(`${baseUrl}/diagnoses`, diagnosesRouter);
app.use(`${baseUrl}/patients`, patientsRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started at http://localhost:${PORT}`);
});
