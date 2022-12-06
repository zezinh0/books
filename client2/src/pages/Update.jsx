import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Update() {
  const [book, setBook] = useState({
    title: '',
    desc: '',
    price: null,
    cover: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8800/books/${location.pathname.split('/')[2]}`,
        book
      );
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  console.log(book);
  return (
    <div className="form">
      <h1>Update New Book</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      ></input>
      <input
        type="text"
        placeholder="description"
        onChange={handleChange}
        name="desc"
      ></input>
      <input
        type="number"
        placeholder="price"
        onChange={handleChange}
        name="price"
      ></input>
      <input
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
      ></input>
      <button className="formButton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
}
