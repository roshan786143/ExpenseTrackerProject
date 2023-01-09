import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [expense, setExpense] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const expenseId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setExpense((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/expenses/${expenseId}`, expense);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
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


  return (
    <div className="form">
      <h1>Update the Expense</h1>
      <input
        type="text"
        placeholder="Expense For :"
        name="title"
        onChange={handleChange}
      />
      {/* <textarea
        rows={3}
        type="text"
        placeholder="Expense desc"
        name="desc"
        onChange={handleChange}
      /> */}
      <input
        type="number"
        placeholder="Expense amount"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Expense description"
        name="desc"
        onChange={handleChange}
      />
      {/* <input
        type="text"
        placeholder="Book cover"
        name="cover"
        onChange={handleChange}
      /> */}
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all expenses</Link>
    </div>
  );
};

export default Update;
