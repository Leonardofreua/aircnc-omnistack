import React, { useState } from "react";
import api from './services/api';
import "./App.css";

import logo from "./assets/logo.svg";

function App() {
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post('/sessions', { email });

    const { _id } = response.data;

    localStorage.setItem('user', _id);
  }

  return (
    <div className="container">
      <img src={logo} alt="AirCnC" />

      <div className="content">
        <p>
          Offer developer <strong>spots</strong> and find{" "}
          <strong>talent</strong> for your business
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">EMAIL *</label>
          <input 
              id="email" 
              type="email" 
              placeholder="Your best email" 
              value={email}
              onChange={event => setEmail(event.target.value)}
          />

          <button className="btn" type="submit">Enter</button>
        </form>
      </div>
    </div>
  );
}

export default App;
