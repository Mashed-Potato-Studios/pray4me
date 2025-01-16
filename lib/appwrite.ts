import { Account, Avatars, Client, OAuthProvider, Permission, Role, Databases, ID } from "react-native-appwrite";
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
import { createUser, getUserByEmail } from './users';

export const config = {
    platform: "com.mashedpotatostudios.prayed",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

// Initialize the client
export const client = new Client()
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!);

// Initialize services
export const avatar = new Avatars(client);
export const accounts = new Account(client);
export const databases = new Databases(client);

export async function login() {
    try {
        const redirectUri = `${config.endpoint}/v1/account/oauth2/success`;
        const failureUri = `${config.endpoint}/v1/account/oauth2/failure`;
        
        // Create OAuth2 session with scopes
        const oauthUrl = await accounts.createOAuth2Session(
            OAuthProvider.Google,
            redirectUri,
            failureUri,
            [
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile',
                'openid',
                'account'
            ]
        );

        // Open browser for authentication
        const result = await openAuthSessionAsync(
            oauthUrl.toString(),
            `${config.platform}://`,
            {
                showInRecents: true,
            }
        );

        if (result.type === 'success') {
            // After successful OAuth, get the current session
            try {
                const session = await accounts.getSession('current');
                return !!session;
            } catch (sessionError) {
                console.error('Session error:', sessionError);
                return false;
            }
        }

        return false;
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}

export async function loginWithEmail(email: string, password: string) {
    try {
        const session = await accounts.createEmailPasswordSession(email, password);
        const user = await getUserByEmail(email);
        if (!user) {
            throw new Error('User not found in database');
        }
        return { session, user };
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export async function signUpWithEmail(email: string, password: string, name: string) {
    try {
        // Create Appwrite account
        const account = await accounts.create(ID.unique(), email, password, name);
        
        // Create user document in database
        const user = await createUser(name, email);
        
        // Automatically log in the user
        const session = await accounts.createEmailPasswordSession(email, password);
        
        return { account, user, session };
    } catch (error) {
        console.error('Sign up error:', error);
        throw error;
    }
}

export async function logout() {
    try {
        await accounts.deleteSession("current");
        return true;
    } catch (error) {
        console.error('Logout error:', error);
        return false;
    }
}

export async function getSession() {
    try {
        const session = await accounts.getSession("current");
        return session;
    } catch (error) {
        console.error('Get session error:', error);
        return null;
    }
}

export async function getCurrentUser() {
    try {
        const response = await accounts.get();
        
        if (response) {
            const userAvatar = avatar.getInitials(response.name);
            return {
                ...response,
                avatar: userAvatar.toString(),
            };
        }
        return null;
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
}