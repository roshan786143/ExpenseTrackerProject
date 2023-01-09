import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import path, {dirname} from 'path';
import {db} from './models/data.js';



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
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};

export  const deleteExpenses = (req, res) => {
  const expenseId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [expenseId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};

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
