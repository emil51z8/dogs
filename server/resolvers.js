import { getAllDogs, createDog, getDogsById } from "./db/dogs.js";

export const resolvers = {
    Query: {
        dogs: (_root, _args) => {
            return getAllDogs();
        },
        dogsById: (_root, { id }) => {
            return getDogsById(id);
        }
    },
    Mutation: {
        CreateDog: (_root, { input: { name, race, owner } }) => {
            return createDog({ name, race, owner });
    }
    }
};