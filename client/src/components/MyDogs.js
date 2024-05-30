import React from 'react';
import { useQuery } from '@apollo/client';
import '../style.css';
import { GET_DOGS_BY_ID } from '../lib/graphql/queries';

const MyDogs = ({ userId }) => {
    console.log(userId);
    const { loading, error, data } = useQuery(GET_DOGS_BY_ID, {
        variables: { id: userId }
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

   return(
    <table>
        <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Race</th>
            <th>Owner</th>
            </tr>
        </thead>
        <tbody>
            {data.dogsById.map(dog => (
                <tr key={dog.id}>
                <td>{dog.id}</td>
                <td>{dog.name}</td>
                <td>{dog.race}</td>
                <td>{dog.owner}</td>
                </tr>
            ))}            
        </tbody>
    </table>
   );
};

export default MyDogs;

