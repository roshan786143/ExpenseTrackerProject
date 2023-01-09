import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import path, {dirname} from 'path';


const myFilePath = path.resolve(dirname('./'), "views", "index.html");

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', function(req, res) {
  res.sendFile(myFilePath);
});

app.use('/expenses',router);

app.listen(8800, () => {
  console.log("Connected to backend.");
});
