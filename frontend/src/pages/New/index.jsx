import React, { useState, useMemo } from "react";
import api from '../../services/api';

import camera from "../../assets/camera.svg";

import "./styles.css";

export default function New({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spots', data, {
      headers: { user_id }
    });

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? "has-thumbnail" : ""}
      >
        <input
          type="file"
          onChange={event => setThumbnail(event.target.files[0])}
        />
        <img src={camera} alt="Select img" />
      </label>

      <label htmlFor="company">COMPANY *</label>
      <input
        id="company"
        placeholder="You amazing company."
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="techs">
        TECHS * <span>(separated by commas)</span>
      </label>
      <input
        id="techs"
        placeholder="Which technologies using?"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="price">DAILY VALUE *</label>
      <input
        id="price"
        placeholder="Amount charged per day."
        value={price}
        onChange={event => setPrice(event.target.value)}
      />

      <button className="btn" type="submit">
        Register
      </button>
    </form>
  );
}
