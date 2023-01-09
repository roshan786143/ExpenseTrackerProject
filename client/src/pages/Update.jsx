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

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/expenses/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

export default Update;
