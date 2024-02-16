import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDb, getDb } from "./db";
import { IMenuItem } from "./interfaces";

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3001;

let db: any;

connectToDb((err) => {
  // if no error occurs then a successful connection
  if (!err) {
    app.listen(port, () => console.log(`server started on port ${port}`));
    db = getDb();
    // console.log(db);
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("on the server").status(200);
});

app.get("/menu_items", async (req: Request, res: Response) => {
  try {
    let query = {};
    // the data received is in it's original form but the data when sent is converted to
    // json so we will only define the type for results when fetched at the server
    // this definition will change at client side
    let results: IMenuItem[] = await db
      .collection("Menu")
      .find(query)
      .toArray(); //this here returns a cursor/ iterator, iterate it and push stuff to arra

    res.send(results).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
});

export default app;