import express from "express";

const app = express();
app.use(express.json());

const PORT = 3003;

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started at http://localhost:${PORT}`);
});
