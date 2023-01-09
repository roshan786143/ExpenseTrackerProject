import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchAllExpenses = async () => {
      try {
        const res = await axios.get("http://localhost:8800/expenses");
        setExpenses(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllExpenses();
  }, []);

  console.log(expenses);

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


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/expenses/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="expenseTracker">Expense Tracker</h1>
      <div className="expenses">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense">
            {/* <img src={book.cover} alt="" /> */}
            <h2 style={{backgroundColor:'#ADA2FF',borderRadius:'2px',color:'red'}}>{expense.title}</h2>
            <p>{expense.desc}</p>
            <span>₹{expense.price}/-</span>
            <button className="delete" onClick={() => handleDelete(expense.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${expense.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new expense
        </Link>
      </button>
    </div>
  );
};

export default Expenses;
