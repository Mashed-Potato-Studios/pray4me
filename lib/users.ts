import { ID, Models, Query } from "appwrite";
import { client, accounts } from "./appwrite";
// import { Databases } from "node-appwrite";
import { Databases } from "react-native-appwrite";

const databases = new Databases(client);
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const USERS_COLLECTION_ID = 'users';

export interface User extends Models.Document {
    name: string;
    email: string;
    avatarUrl?: string;
}

export async function createUser(name: string, email: string, avatarUrl?: string): Promise<User> {
    try {
        const user = await databases.createDocument(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            ID.unique(),
            {
                name,
                email,
                avatarUrl
            }
        );
        return user as User;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function getUserById(userId: string): Promise<User | null> {
    try {
        const user = await databases.getDocument(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            userId
        );
        return user as User;
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
}

export async function getUserByEmail(email: string): Promise<User | null> {
    try {
        const users = await databases.listDocuments(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            [Query.equal('email', email)]
        );
        return users.documents[0] as User || null;
    } catch (error) {
        console.error('Error getting user by email:', error);
        return null;
    }
}

export async function updateUser(userId: string, data: Partial<User>): Promise<User> {
    try {
        const user = await databases.updateDocument(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            userId,
            data
        );
        return user as User;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export async function deleteUser(userId: string): Promise<boolean> {
    try {
        await databases.deleteDocument(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            userId
        );
        return true;
    } catch (error) {
        console.error('Error deleting user:', error);
        return false;
    }
}

export async function listUsers(limit: number = 20, offset: number = 0): Promise<Models.DocumentList<User>> {
    try {
        const users = await databases.listDocuments(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            [
                Query.limit(limit),
                Query.offset(offset)
            ]
        );
        return users as Models.DocumentList<User>;
    } catch (error) {
        console.error('Error listing users:', error);
        throw error;
    }
}
