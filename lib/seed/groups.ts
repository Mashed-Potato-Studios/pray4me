import { ID } from 'appwrite';
import { databases } from '../appwrite';
import { Group, GroupMember, GroupPrayer } from '../schemas/groups';
import { handleApiError } from '../utils/error-handling';

const databaseId = process.env.EXPO_PUBLIC_DATABASE_ID!;
const collectionId = process.env.EXPO_PUBLIC_GROUPS_COLLECTION_ID!;

// Sample users for seeding
const sampleUsers = [
  { id: 'user1', name: 'John Doe' },
  { id: 'user2', name: 'Jane Smith' },
  { id: 'user3', name: 'Michael Johnson' },
  { id: 'user4', name: 'Sarah Williams' },
  { id: 'user5', name: 'David Brown' },
  { id: 'user6', name: 'Emily Davis' },
  { id: 'user7', name: 'James Wilson' },
  { id: 'user8', name: 'Maria Garcia' },
  { id: 'user9', name: 'Robert Taylor' },
  { id: 'user10', name: 'Lisa Anderson' },
  { id: 'user11', name: 'Daniel Martinez' },
  { id: 'user12', name: 'Jennifer Lee' },
  { id: 'user13', name: 'William Turner' },
  { id: 'user14', name: 'Patricia White' },
  { id: 'user15', name: 'Thomas Harris' },
];

// Sample prayers for seeding
const samplePrayers: Partial<GroupPrayer>[] = [
  {
    id: ID.unique(),
    content: 'Praying for healing and strength during my recovery.',
    userId: 'user1',
    prayerCount: 15,
    isAnonymous: false,
  },
  {
    id: ID.unique(),
    content: 'Please pray for my upcoming job interview.',
    userId: 'user2',
    prayerCount: 8,
    isAnonymous: false,
  },
  {
    id: ID.unique(),
    content: 'Seeking guidance for an important life decision.',
    userId: 'user3',
    prayerCount: 12,
    isAnonymous: false,
  },
  {
    id: ID.unique(),
    content: 'Praying for peace in my family.',
    userId: 'user4',
    prayerCount: 20,
    isAnonymous: true,
  },
  {
    id: ID.unique(),
    content: 'Need strength to overcome addiction.',
    userId: 'user5',
    prayerCount: 25,
    isAnonymous: true,
  },
  {
    id: ID.unique(),
    content: "Praying for my children's education and future.",
    userId: 'user6',
    prayerCount: 18,
    isAnonymous: false,
  },
  {
    id: ID.unique(),
    content: 'Seeking prayers for mental health and anxiety.',
    userId: 'user7',
    prayerCount: 30,
    isAnonymous: false,
  },
  {
    id: ID.unique(),
    content: 'Please pray for my marriage restoration.',
    userId: 'user8',
    prayerCount: 22,
    isAnonymous: true,
  },
  {
    id: ID.unique(),
    content: 'Praying for financial breakthrough.',
    userId: 'user9',
    prayerCount: 16,
    isAnonymous: false,
  },
  {
    id: ID.unique(),
    content: 'Need wisdom for ministry leadership.',
    userId: 'user10',
    prayerCount: 14,
    isAnonymous: false,
  },
];

// Sample groups data
const sampleGroups: Partial<Group>[] = [
  {
    name: 'Health & Healing Prayer Circle',
    description: 'A supportive community focused on prayers for health, healing, and recovery. Share your health-related prayer requests and support others in their journey to wellness.',
    privacy: 'public',
    category: 'health',
    imageUrl: 'https://images.unsplash.com/photo-1518949300635-3c7e4a00494d',
    rules: [
      'Respect privacy and confidentiality',
      'Be supportive and encouraging',
      'No medical advice, only prayer support',
    ],
    tags: ['health', 'healing', 'support', 'wellness'],
    isVerified: true,
    location: {
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
    },
  },
  {
    name: 'Family First Prayer Group',
    description: 'A place to share prayers for family relationships, parenting challenges, and household harmony. Supporting families through prayer.',
    privacy: 'public',
    category: 'family',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300',
    rules: [
      'Family-friendly content only',
      'Respect all family structures',
      'Maintain confidentiality',
    ],
    tags: ['family', 'parenting', 'relationships'],
    isVerified: true,
  },
  {
    name: 'Career & Purpose Prayer Network',
    description: "Join us in praying for career guidance, job opportunities, and discovering God's purpose for your professional life.",
    privacy: 'public',
    category: 'work',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    rules: [
      'No job postings or recruiting',
      'Focus on prayer and support',
      'Respect professional boundaries',
    ],
    tags: ['career', 'purpose', 'work', 'guidance'],
    isVerified: false,
  },
  {
    name: 'Spiritual Growth & Guidance',
    description: 'A community dedicated to prayers for spiritual growth, wisdom, and divine guidance in all aspects of life.',
    privacy: 'public',
    category: 'guidance',
    imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334',
    rules: [
      'Respect different denominations',
      'Focus on personal growth',
      'No preaching or judgment',
    ],
    tags: ['spiritual', 'growth', 'wisdom', 'guidance'],
    isVerified: true,
  },
  {
    name: 'Youth Prayer Circle',
    description: 'A safe space for young people to share prayer requests and support each other in their faith journey.',
    privacy: 'private',
    category: 'other',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac',
    rules: [
      'Age 13-25 only',
      'Safe and respectful environment',
      'No inappropriate content',
    ],
    tags: ['youth', 'teens', 'young adults'],
    isVerified: false,
  },
  {
    name: 'Mental Health Support & Prayer',
    description: 'A caring community focused on mental health, emotional healing, and spiritual support through prayer.',
    privacy: 'private',
    category: 'health',
    imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88',
    rules: [
      'Respect mental health challenges',
      'No stigmatization',
      'Professional help encouraged alongside prayer',
    ],
    tags: ['mental health', 'emotional healing', 'support', 'anxiety', 'depression'],
    isVerified: true,
  },
  {
    name: 'Marriage Restoration Warriors',
    description: 'Supporting couples through prayer for marriage restoration, healing, and strengthening relationships.',
    privacy: 'private',
    category: 'family',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300',
    rules: [
      'Confidentiality is crucial',
      'No relationship advice',
      'Focus on prayer support',
    ],
    tags: ['marriage', 'relationships', 'restoration', 'couples'],
    isVerified: true,
  },
  {
    name: 'Financial Breakthrough Circle',
    description: "A community praying for financial wisdom, debt freedom, and God's provision.",
    privacy: 'public',
    category: 'work',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e',
    rules: [
      'No financial advice',
      'No money solicitation',
      'Focus on prayer and encouragement',
    ],
    tags: ['finances', 'provision', 'debt freedom', 'wisdom'],
    isVerified: false,
  },
  {
    name: 'Global Missions Prayer Network',
    description: 'Uniting in prayer for missionaries, global outreach, and spreading the Gospel worldwide.',
    privacy: 'public',
    category: 'guidance',
    imageUrl: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c',
    rules: [
      'Respect cultural differences',
      'No political discussions',
      'Focus on mission support',
    ],
    tags: ['missions', 'global', 'evangelism', 'outreach'],
    isVerified: true,
  },
  {
    name: 'Addiction Recovery Prayer Support',
    description: 'A confidential space for those seeking prayer support in their journey to recovery from various addictions.',
    privacy: 'private',
    category: 'health',
    imageUrl: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8',
    rules: [
      'Strict confidentiality',
      'No triggering content',
      'Professional help encouraged',
    ],
    tags: ['recovery', 'addiction', 'healing', 'support'],
    isVerified: true,
  },
];

// Function to create a member with random role
const createMember = (userId: string, name: string): GroupMember => ({
  userId,
  role: Math.random() > 0.8 ? 'admin' : Math.random() > 0.5 ? 'moderator' : 'member',
  joinedAt: new Date(),
  status: 'active',
});

// Helper function to get random items from an array
const getRandomItems = <T>(array: T[], min: number, max: number): T[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  return array
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};

// Seed function
export const seedGroups = async () => {
  try {
    console.log('Starting groups seeding...');

    for (const groupData of sampleGroups) {
      // Add random members to each group
      const members = getRandomItems(sampleUsers, 3, 10)
        .map(user => createMember(user.id, user.name));

      // Add random prayers to each group
      const prayers = getRandomItems(samplePrayers, 2, 6)
        .map(prayer => ({
          ...prayer,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
          updatedAt: new Date(),
        }));

      // Create the group with members and prayers
      const group = {
        ...groupData,
        members,
        prayers,
        memberCount: members.length,
        createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000), // Random date within last 90 days
        updatedAt: new Date(),
      };

      // Save to Appwrite
      await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        group
      );

      console.log(`Created group: ${group.name}`);
    }

    console.log('Groups seeding completed successfully!');
  } catch (error) {
    const apiError = handleApiError(error);
    console.error('Error seeding groups:', apiError.message);
    throw apiError;
  }
};

// Function to clean up seeded data
export const cleanupGroups = async () => {
  try {
    console.log('Cleaning up seeded groups...');

    const response = await databases.listDocuments(databaseId, collectionId);
    
    for (const doc of response.documents) {
      await databases.deleteDocument(databaseId, collectionId, doc.$id);
      console.log(`Deleted group: ${doc.name}`);
    }

    console.log('Cleanup completed successfully!');
  } catch (error) {
    const apiError = handleApiError(error);
    console.error('Error cleaning up groups:', apiError.message);
    throw apiError;
  }
};

// Helper function to run seeding
export const runGroupsSeeding = async (cleanup = false) => {
  if (cleanup) {
    await cleanupGroups();
  }
  await seedGroups();
};

export { seedGroups, cleanupGroups, runGroupsSeeding };
