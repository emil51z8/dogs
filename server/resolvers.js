import { getAllDogs, createDog, getDogsById, deleteDog, updateDog, getDogById } from "./db/dogs.js";

export const resolvers = {
    Query: {
        dogs: (_root, _args) => {
            return getAllDogs();
        },
        dogsById: (_root, { id }) => {
            return getDogsById(id);
        },
        getDogById: (_root, { id }) => {
            return getDogById(id);
        }
    },
    Mutation: {
        CreateDog: (_root, { input: { name, breed, owner, dateofbirth } }) => {
            return createDog({ name, breed, owner, dateofbirth});
    },
        deleteDog: (_root, { id }) => deleteDog(id),

        updateDog: (_root, { input: { id, name,breed,dateofbirth} }) => {
            return updateDog({ id, name,breed, dateofbirth });
        }
    },
};