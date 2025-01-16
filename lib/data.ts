export interface User {
  $id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Prayer {
  $id: string;
  userId: string;
  title: string;
  description: string;
  category: PrayerCategory;
  isAnswered: boolean;
  prayerCount: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export type PrayerCategory =
  | 'Healing'
  | 'Guidance'
  | 'Family'
  | 'Financial'
  | 'Spiritual Growth'
  | 'Relationships'
  | 'Work/Career'
  | 'Other';

export const mockUsers: User[] = [
  {
    $id: 'user1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    avatarUrl: 'https://ui-avatars.com/api/?name=John+Smith',
  },
  {
    $id: 'user2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    avatarUrl: 'https://ui-avatars.com/api/?name=Sarah+Johnson',
  },
  {
    $id: 'user3',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    avatarUrl: 'https://ui-avatars.com/api/?name=Michael+Brown',
  },
];

export const mockPrayers: Prayer[] = [
  {
    $id: 'prayer1',
    userId: 'user1',
    title: 'Healing for My Mother',
    description: 'Please pray for my mother who is currently battling cancer. She starts her treatment next week.',
    category: 'Healing',
    isAnswered: false,
    prayerCount: 156,
    createdAt: '2025-01-10T12:00:00.000Z',
    updatedAt: '2025-01-10T12:00:00.000Z',
    user: mockUsers[0],
  },
  {
    $id: 'prayer2',
    userId: 'user2',
    title: 'Guidance for Career Decision',
    description: 'I have two job offers and need wisdom to make the right choice for my family.',
    category: 'Guidance',
    isAnswered: false,
    prayerCount: 89,
    createdAt: '2025-01-12T15:30:00.000Z',
    updatedAt: '2025-01-12T15:30:00.000Z',
    user: mockUsers[1],
  },
  {
    $id: 'prayer3',
    userId: 'user3',
    title: 'Family Reconciliation',
    description: 'Praying for healing and restoration in my relationship with my siblings.',
    category: 'Family',
    isAnswered: false,
    prayerCount: 234,
    createdAt: '2025-01-13T09:15:00.000Z',
    updatedAt: '2025-01-13T09:15:00.000Z',
    user: mockUsers[2],
  },
  {
    $id: 'prayer4',
    userId: 'user1',
    title: 'Financial Breakthrough',
    description: 'Need prayer for wisdom in managing finances and getting out of debt.',
    category: 'Financial',
    isAnswered: true,
    prayerCount: 167,
    createdAt: '2025-01-14T18:45:00.000Z',
    updatedAt: '2025-01-15T10:20:00.000Z',
    user: mockUsers[0],
  },
  {
    $id: 'prayer5',
    userId: 'user2',
    title: 'Spiritual Growth',
    description: 'Seeking deeper understanding of God\'s word and purpose for my life.',
    category: 'Spiritual Growth',
    isAnswered: false,
    prayerCount: 145,
    createdAt: '2025-01-15T08:00:00.000Z',
    updatedAt: '2025-01-15T08:00:00.000Z',
    user: mockUsers[1],
  },
];
