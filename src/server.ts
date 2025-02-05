import express from "express";
import { server } from "./config";

const app = express();
app.use(express.json());

const port = server.port;

app.listen(port, () => {
  console.log(`backend application server started on port ${port} 📦`);
});
