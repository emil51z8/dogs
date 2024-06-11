import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_DOGS } from '../lib/graphql/queries.js';
import '../style.css';

const DogList = () => {
    const { loading, error, data, refetch } = useQuery(GET_DOGS);

    refetch();
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Breed</th>
              <th>Owner</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {data.dogs.map(dog => (
              <tr key={dog.id}>
                <td>{dog.id}</td>
                <td>{dog.name}</td>
                <td>{dog.breed}</td>
                <td>{dog.owner}</td>
                <td>{dog.dateofbirth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    };
    
    export default DogList;