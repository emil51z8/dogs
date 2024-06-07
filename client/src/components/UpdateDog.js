import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';
import '../style.css';
import { GET_DOG_BY_ID, UPDATE_DOG } from "../lib/graphql/queries";

const UpdateDog = ({ dogId, onUpdate }) => {
    const { loading, error, data } = useQuery(GET_DOG_BY_ID, {
        variables: { getDogByIdId: dogId } 
    });

    const [updateDog] = useMutation(UPDATE_DOG);

    const [formData, setFormData] = useState({
        name: '',
        breed: ''
    });

    useEffect(() => {
        if (!loading && data && data.dog) {
            // Set initial form values from fetched data
            setFormData({
                name: data.dog.name,
                breed: data.dog.breed
            });
        }
    }, [loading, data]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDog({
                variables: {
                    input: {
                        id: dogId,
                        name: formData.name,
                        breed: formData.breed
                    }
                }
            });
            onUpdate(); // Trigger the callback to update the dog list
        } catch (error) {
            console.error('Error updating dog:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Update Dog</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
                <label>Breed:</label>
                <input type="text" name="breed" value={formData.breed} onChange={handleChange} />
                <button type="submit">Update Dog</button>
            </form>
        </div>
    );
}

export default UpdateDog;