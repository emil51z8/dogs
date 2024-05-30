import { connection } from "./connection.js";

const getUsersTable = () => connection.table('User');

export async function getUserByUsername(username) {
    try {
        const user = await getUsersTable().where({ username }).first();
        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}