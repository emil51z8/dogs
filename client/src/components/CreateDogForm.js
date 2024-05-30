import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_DOG } from '../lib/graphql/queries';

const CreateDogForm = ({ user }) => {
  const [formState, setFormState] = useState({ name: '', race: '', owner: '' });
  const navigate = useNavigate();
  const [createDog, { data, loading, error }] = useMutation(CREATE_DOG, {
    onCompleted: () => {
        navigate('/doglist');
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      createDog({ variables: { input: { ...formState, owner: user } } });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="race">Race:</label>
          <input
            type="text"
            id="race"
            name="race"
            value={formState.race}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Dog</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Dog created: {data.CreateDog.name}</p>}
    </div>
  );
};

export default CreateDogForm;