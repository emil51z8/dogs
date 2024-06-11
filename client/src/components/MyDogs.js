import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import '../style.css';
import { GET_DOGS_BY_ID, DELETE_DOG } from '../lib/graphql/queries';
import UpdateDog from './UpdateDog';

const MyDogs = ({ userId }) => {
    const { loading, error, data, refetch } = useQuery(GET_DOGS_BY_ID, {
        variables: { id: userId }
    });

    refetch();


    const [deleteDog] = useMutation(DELETE_DOG, {
        onCompleted: () => {
            refetch();
        },
        onError: (err) => {
            console.error('Error in mutation:', err);
        }
    });

    const handleDelete = async (dogId) => {
        console.log('Deleting dog with ID:', dogId);
        try {
            await deleteDog({
                variables: { id: dogId }
            });
        } catch (err) {
            console.error('Error deleting dog:', err);
        }
    };

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedDogId, setSelectedDogId] = useState(null);

    const handleUpdateClick = (dogId) => {
        setShowUpdateForm(true);
        setSelectedDogId(dogId);
    };

    const handleUpdateComplete = () => {
        setShowUpdateForm(false);
        setSelectedDogId(null);
        refetch();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Breed</th>
                        <th>Owner</th>
                        <th>Date of Birth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.dogsById.map(dog => (
                        <tr key={dog.id}>
                            <td>{dog.id}</td>
                            <td>{dog.name}</td>
                            <td>{dog.breed}</td>
                            <td>{dog.owner}</td>
                            <td>{dog.dateofbirth}</td>
                            <td>
                                <button onClick={() => handleUpdateClick(parseInt(dog.id))}>Update</button>
                                <button onClick={() => handleDelete(parseInt(dog.id))}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showUpdateForm && (
                <UpdateDog dogId={selectedDogId} onUpdate={handleUpdateComplete}/>
            )}
        </div>
    );
};

export default MyDogs;