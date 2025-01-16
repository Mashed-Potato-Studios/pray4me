import { ID, Databases, Query, Permission, Role, Models } from "react-native-appwrite";
import { client } from "./appwrite";

// Initialize database service for client operations
const databases = new Databases(client);

// Database and collection IDs should be in environment variables
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const PRAYERS_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_PRAYERS_COLLECTION_ID!;

export interface Prayer extends Models.Document {
  userId: string;
  title: string;
  description: string;
  category: string;
  isAnswered: boolean;
  prayerCount: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

// Create a new prayer request
export async function createPrayer(
  userId: string,
  title: string,
  description: string,
  category: string
) {
  try {
    const prayer = await databases.createDocument(
      DATABASE_ID,
      PRAYERS_COLLECTION_ID,
      ID.unique(),
      {
        userId,
        title,
        description,
        category,
        isAnswered: false,
        prayerCount: 0,
        likeCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
    return prayer as Prayer;
  } catch (error) {
    console.error("Error creating prayer:", error);
    throw error;
  }
}

// Get featured prayers (most liked and prayed for)
export async function getFeaturedPrayers(limit: number = 3) {
  try {
    const prayers = await databases.listDocuments<Prayer>(
      DATABASE_ID,
      PRAYERS_COLLECTION_ID,
      [
        Query.orderDesc("likeCount"),
        Query.orderDesc("prayerCount"),
        Query.limit(limit)
      ]
    );
    return prayers;
  } catch (error) {
    console.error("Error fetching featured prayers:", error);
    throw error;
  }
}

// Get all prayers with optional filters
export async function getPrayers(
  limit: number = 10,
  offset: number = 0,
  filters: Array<string> = []
) {
  try {
    const queries = [Query.orderDesc("createdAt"), Query.limit(limit), Query.offset(offset), ...filters];
    const prayers = await databases.listDocuments<Prayer>(
      DATABASE_ID,
      PRAYERS_COLLECTION_ID,
      queries
    );
    return prayers;
  } catch (error) {
    console.error("Error fetching prayers:", error);
    throw error;
  }
}

// Get prayers by user ID
export async function getUserPrayers(userId: string) {
  try {
    const prayers = await databases.listDocuments<Prayer>(
      DATABASE_ID,
      PRAYERS_COLLECTION_ID,
      [Query.equal("userId", userId)]
    );
    return prayers;
  } catch (error) {
    console.error("Error fetching user prayers:", error);
    throw error;
  }
}

// Update a prayer request
export async function updatePrayer(
  prayerId: string,
  data: Partial<Omit<Prayer, "id" | "userId" | "createdAt">>
) {
  try {
    const prayer = await databases.updateDocument<Prayer>(
      DATABASE_ID,
      PRAYERS_COLLECTION_ID,
      prayerId,
      {
        ...data,
        updatedAt: new Date().toISOString(),
      }
    );
    return prayer;
  } catch (error) {
    console.error("Error updating prayer:", error);
    throw error;
  }
}

// Delete a prayer request
export async function deletePrayer(prayerId: string) {
  try {
    await databases.deleteDocument(
      DATABASE_ID,
      PRAYERS_COLLECTION_ID,
      prayerId
    );
    return true;
  } catch (error) {
    console.error("Error deleting prayer:", error);
    return false;
  }
}

// Increment prayer count
export async function incrementPrayerCount(prayerId: string) {
  try {
    const prayer = await databases.getDocument<Prayer>(
      DATABASE_ID,
      PRAYERS_COLLECTION_ID,
      prayerId
    );
    
    const updatedPrayer = await databases.updateDocument<Prayer>(
      DATABASE_ID,
      PRAYERS_COLLECTION_ID,
      prayerId,
      {
        prayerCount: (prayer.prayerCount || 0) + 1,
        updatedAt: new Date().toISOString(),
      }
    );
    return updatedPrayer;
  } catch (error) {
    console.error("Error incrementing prayer count:", error);
    throw error;
  }
}

// Like a prayer
export async function likePrayer(prayerId: string) {
  try {
    const prayer = await databases.getDocument<Prayer>(
      DATABASE_ID,
      PRAYERS_COLLECTION_ID,
      prayerId
    );
    
    const updatedPrayer = await databases.updateDocument<Prayer>(
      DATABASE_ID,
      PRAYERS_COLLECTION_ID,
      prayerId,
      {
        likeCount: (prayer.likeCount || 0) + 1,
        updatedAt: new Date().toISOString(),
      }
    );
    return updatedPrayer;
  } catch (error) {
    console.error("Error liking prayer:", error);
    throw error;
  }
}

// Mark prayer as answered
export async function markPrayerAsAnswered(prayerId: string) {
  try {
    const prayer = await databases.updateDocument<Prayer>(
      DATABASE_ID,
      PRAYERS_COLLECTION_ID,
      prayerId,
      {
        isAnswered: true,
        updatedAt: new Date().toISOString(),
      }
    );
    return prayer;
  } catch (error) {
    console.error("Error marking prayer as answered:", error);
    throw error;
  }
}
