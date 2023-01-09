import {db} from '../models/data.js';

export  const getExpenses = (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  };

export const postExpenses = (req, res) => {
    const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";
  
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

export  const updateExpenses = (req, res) => {
    const expenseId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
    ];
  
    db.query(q, [...values,expenseId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  };

