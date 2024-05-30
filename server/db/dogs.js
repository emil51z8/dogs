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

export async function createDog({ name, race, owner }) {
    const dog = {
        name: name,
        race: race,
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