import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import path, {dirname} from 'path';
import {db} from './models/data.js';
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const myFilePath = path.resolve(dirname('./'), "views", "index.html");

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=> {
  res.sendFile(myFilePath);
});
app.post('/',(req, res) => {
  const q = "INSERT INTO user(`name`, `email`,`password`) VALUES (?)";

  const values = [
    req.body.name,
    req.body.email,
    req.body.password
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


app.use('/expenses',router);

app.listen(8800, () => {
  console.log("Connected to backend.");
});
