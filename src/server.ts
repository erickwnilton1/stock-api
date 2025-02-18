import express from "express";
import { server } from "./config";
import { Request, Response } from "express";
import { router } from "./routes/routes";

const app = express();
app.use(express.json());
app.use(router);

const message =
  "to access the app endpoints, consult the project routes file [stock-api].";

app.get("/", (request: Request, res: Response) => {
  res.send(message);
});

const port = server.port;

app.listen(port, () => {
  console.log(`backend application server started on port ${port} 📦`);
});
