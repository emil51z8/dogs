import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_DOG, GET_DOGS, GET_DOGS_BY_ID } from '../lib/graphql/queries';

const CreateDogForm = ({ user }) => {
  const [formState, setFormState] = useState({ name: '', breed: '', owner: '', dateofbirth: '' });
  const navigate = useNavigate();
  
  const [createDog, { data, loading, error }] = useMutation(CREATE_DOG, {
    refetchQueries: [
      { query: GET_DOGS },
    ],
    onCompleted: () => {
      navigate('/doglist');
    },
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
      // Parse dateofbirth as a Date object
      const date = new Date(formState.dateofbirth);
      // Format the date as a string (e.g., "YYYY-MM-DD")
      const formattedDate = date.toISOString().split('T')[0];
      
      // Create the dog with the formatted date
      createDog({ variables: { input: { ...formState, dateofbirth: formattedDate, owner: user } } });
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
          <label htmlFor="breed">Breed:</label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={formState.breed}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dateofbirth">Date of Birth:</label>
          <input
            type="date"
            id="dateofbirth"
            name="dateofbirth"
            value={formState.dateofbirth}
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