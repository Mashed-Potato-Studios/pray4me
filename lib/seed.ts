import { ID, Permission, Role } from 'appwrite';
import { Client, Databases } from 'node-appwrite';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize the Node.js client for admin operations
const adminClient = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

const adminDb = new Databases(adminClient);

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const PRAYERS_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_PRAYERS_COLLECTION_ID!;

async function createPrayersCollection() {
  try {
    console.log('Creating prayers collection with ID:', PRAYERS_COLLECTION_ID);
    console.log('In database:', DATABASE_ID);
    
    const collection = await adminDb.createCollection(
      DATABASE_ID,
      PRAYERS_COLLECTION_ID,
      'Prayers',
      [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users())
      ]
    );

    // Create attributes for the Prayers collection
    await adminDb.createStringAttribute(DATABASE_ID, PRAYERS_COLLECTION_ID, 'userId', 255, true);
    await adminDb.createStringAttribute(DATABASE_ID, PRAYERS_COLLECTION_ID, 'title', 255, true);
    await adminDb.createStringAttribute(DATABASE_ID, PRAYERS_COLLECTION_ID, 'description', 1000, true);
    await adminDb.createStringAttribute(DATABASE_ID, PRAYERS_COLLECTION_ID, 'category', 50, true);
    await adminDb.createBooleanAttribute(DATABASE_ID, PRAYERS_COLLECTION_ID, 'isAnswered', true);
    await adminDb.createIntegerAttribute(DATABASE_ID, PRAYERS_COLLECTION_ID, 'prayerCount', true, 0);
    await adminDb.createIntegerAttribute(DATABASE_ID, PRAYERS_COLLECTION_ID, 'likeCount', true, 0);
    await adminDb.createDatetimeAttribute(DATABASE_ID, PRAYERS_COLLECTION_ID, 'createdAt', true);
    await adminDb.createDatetimeAttribute(DATABASE_ID, PRAYERS_COLLECTION_ID, 'updatedAt', true);

    console.log('Prayers collection created successfully');
    return collection;
  } catch (error: any) {
    if (error?.type === 'collection_already_exists') {
      console.log('Prayers collection already exists, updating permissions...');
      await adminDb.updateCollection(
        DATABASE_ID,
        PRAYERS_COLLECTION_ID,
        'Prayers',
        [
          Permission.read(Role.any()),
          Permission.create(Role.users()),
          Permission.update(Role.users()),
          Permission.delete(Role.users())
        ]
      );
      console.log('Permissions updated successfully');
    } else {
      console.error('Error creating prayers collection:', error);
      throw error;
    }
  }
}

export async function seedDatabase() {
  try {
    // Verify environment variables are loaded
    console.log('Environment variables loaded:');
    console.log('Database ID:', DATABASE_ID);
    console.log('Collection ID:', PRAYERS_COLLECTION_ID);
    
    await createPrayersCollection();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}
