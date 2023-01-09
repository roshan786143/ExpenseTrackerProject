import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [expense, setExpense] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setExpense((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/expenses", expense);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Add New Expense</h1>
      <input
        type="text"
        placeholder="Expense For :"
        name="title"
        onChange={handleChange}
      />
      {/* <textarea
        rows={5}
        type="text"
        placeholder="Expense desc"
        name="desc"
        onChange={handleChange}
      /> */}
      <input
        type="text"
        placeholder="Expense description :"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Expense amount"
        name="price"
        onChange={handleChange}
      />
      {/* <input
        type="text"
        placeholder="Expense cover"
        name="cover"
        onChange={handleChange}
      /> */}
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See your all expenses</Link>
    </div>
  );
};

export default Add;
