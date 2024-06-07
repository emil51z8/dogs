import { connection } from "./connection.js";

const getDogsTable = () => connection.table('Dog');

export async function getAllDogs() {
    try {
        return await getDogsTable();
    } catch (error) {
        console.error("Error fetching dogs:", error);
        throw error;
    }
}

export async function getDogsById(id) {
    try {
        const dogs = await getDogsTable().where({ owner: id });
        return dogs;
    } catch (error) {
        console.error("Error fetching dog:", error);
        throw error;
    }
}

export async function createDog({ name, breed, owner }) {
    const dog = {
        name: name,
        breed: breed,
        owner: owner,
    }
   
    
    try {
        await getDogsTable().insert(dog);
        return dog;
    } catch (error) {
        console.error("Error inserting dog:", error);
        throw error;
    }
}

export async function deleteDog(id) {
    const dog = await getDogsTable().first().where({ id });
    if (!dog) {
        throw new Error(`Dog with id ${id} not found`);
    }
    await getDogsTable().delete().where({ id });
    return dog;
}

export async function updateDog({ id, name, breed }) {
    const dog = await getDogsTable().first().where({ id });
    if (!dog) {
        throw new Error(`Dog with id ${id} not found`);
    }
    const updatedFields = { name, breed };
    await getDogsTable().update(updatedFields).where({ id });
    return { ...dog, ...updatedFields };
}

export async function getDogById(id) {
    try {
        const dog = await getDogsTable().first().where({ id });
        return dog;
    } catch (error) {
        console.error("Error fetching dog:", error);
        throw error;
    }
}