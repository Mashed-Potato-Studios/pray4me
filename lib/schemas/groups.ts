import { ID, Models, Permission, Role } from 'appwrite';

export interface GroupMember {
  userId: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: Date;
  status: 'active' | 'inactive' | 'banned';
}

export interface GroupPrayer {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  prayerCount: number;
  isAnonymous: boolean;
}

export interface Group extends Models.Document {
  name: string;
  description: string;
  imageUrl?: string;
  privacy: 'public' | 'private' | 'secret';
  category: 'health' | 'family' | 'work' | 'guidance' | 'other';
  members: GroupMember[];
  prayers: GroupPrayer[];
  memberCount: number;
  createdAt: Date;
  updatedAt: Date;
  rules?: string[];
  tags?: string[];
  isVerified: boolean;
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
}

export const GROUP_PERMISSIONS = {
  public: [
    Permission.read(Role.any()),
    Permission.create(Role.users()),
    Permission.update(Role.team('admins')),
    Permission.delete(Role.team('admins')),
  ],
  private: [
    Permission.read(Role.team('members')),
    Permission.create(Role.team('members')),
    Permission.update(Role.team('moderators')),
    Permission.delete(Role.team('admins')),
  ],
  secret: [
    Permission.read(Role.team('members')),
    Permission.create(Role.team('moderators')),
    Permission.update(Role.team('admins')),
    Permission.delete(Role.team('admins')),
  ],
};

export const createGroup = (data: Partial<Group>): Partial<Group> => {
  return {
    name: data.name,
    description: data.description || '',
    imageUrl: data.imageUrl,
    privacy: data.privacy || 'public',
    category: data.category || 'other',
    members: [],
    prayers: [],
    memberCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    rules: data.rules || [],
    tags: data.tags || [],
    isVerified: false,
    location: data.location,
  };
};

export const GROUP_COLLECTION_SCHEMA = {
  name: 'groups',
  permissions: GROUP_PERMISSIONS.public,
  documentSecurity: true,
  indexes: [
    {
      key: 'name',
      type: 'fulltext',
      attributes: ['name'],
    },
    {
      key: 'category',
      type: 'key',
      attributes: ['category'],
    },
    {
      key: 'privacy',
      type: 'key',
      attributes: ['privacy'],
    },
    {
      key: 'memberCount',
      type: 'key',
      attributes: ['memberCount'],
    },
    {
      key: 'createdAt',
      type: 'key',
      attributes: ['createdAt'],
    },
  ],
  attributes: [
    {
      key: 'name',
      type: 'string',
      size: 100,
      required: true,
      array: false,
    },
    {
      key: 'description',
      type: 'string',
      size: 1000,
      required: true,
      array: false,
    },
    {
      key: 'imageUrl',
      type: 'string',
      size: 255,
      required: false,
      array: false,
    },
    {
      key: 'privacy',
      type: 'string',
      size: 10,
      required: true,
      array: false,
      enum: ['public', 'private', 'secret'],
    },
    {
      key: 'category',
      type: 'string',
      size: 20,
      required: true,
      array: false,
      enum: ['health', 'family', 'work', 'guidance', 'other'],
    },
    {
      key: 'members',
      type: 'string',
      size: 1000000,
      required: true,
      array: true,
    },
    {
      key: 'prayers',
      type: 'string',
      size: 1000000,
      required: true,
      array: true,
    },
    {
      key: 'memberCount',
      type: 'integer',
      required: true,
      min: 0,
      max: 1000000,
      array: false,
    },
    {
      key: 'createdAt',
      type: 'datetime',
      required: true,
      array: false,
    },
    {
      key: 'updatedAt',
      type: 'datetime',
      required: true,
      array: false,
    },
    {
      key: 'rules',
      type: 'string',
      size: 500,
      required: false,
      array: true,
    },
    {
      key: 'tags',
      type: 'string',
      size: 50,
      required: false,
      array: true,
    },
    {
      key: 'isVerified',
      type: 'boolean',
      required: true,
      array: false,
    },
    {
      key: 'location',
      type: 'string',
      size: 1000,
      required: false,
      array: false,
    },
  ],
};
