import { ID, Query } from 'appwrite';
import { databases } from '../appwrite';
import { Group, GroupMember, GroupPrayer, createGroup } from '../schemas/groups';

const databaseId = process.env.EXPO_PUBLIC_DATABASE_ID!;
const collectionId = process.env.EXPO_PUBLIC_GROUPS_COLLECTION_ID!;

export const groupsApi = {
  /**
   * Create a new prayer group
   */
  async createGroup(data: Partial<Group>) {
    try {
      const groupData = createGroup(data);
      const response = await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        groupData
      );
      return response;
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  },

  /**
   * Get a group by ID
   */
  async getGroup(groupId: string) {
    try {
      const response = await databases.getDocument<Group>(
        databaseId,
        collectionId,
        groupId
      );
      return response;
    } catch (error) {
      console.error('Error getting group:', error);
      throw error;
    }
  },

  /**
   * Update a group's details
   */
  async updateGroup(groupId: string, data: Partial<Group>) {
    try {
      const response = await databases.updateDocument<Group>(
        databaseId,
        collectionId,
        groupId,
        data
      );
      return response;
    } catch (error) {
      console.error('Error updating group:', error);
      throw error;
    }
  },

  /**
   * Delete a group
   */
  async deleteGroup(groupId: string) {
    try {
      await databases.deleteDocument(
        databaseId,
        collectionId,
        groupId
      );
      return true;
    } catch (error) {
      console.error('Error deleting group:', error);
      throw error;
    }
  },

  /**
   * List all groups with optional filters
   */
  async listGroups({
    queries = [],
    limit = 10,
    offset = 0,
  }: {
    queries?: string[];
    limit?: number;
    offset?: number;
  } = {}) {
    try {
      const response = await databases.listDocuments<Group>(
        databaseId,
        collectionId,
        [
          ...queries,
          Query.limit(limit),
          Query.offset(offset),
        ]
      );
      return response;
    } catch (error) {
      console.error('Error listing groups:', error);
      throw error;
    }
  },

  /**
   * Add a member to a group
   */
  async addMember(groupId: string, member: GroupMember) {
    try {
      const group = await this.getGroup(groupId);
      const updatedMembers = [...group.members, member];
      const response = await this.updateGroup(groupId, {
        members: updatedMembers,
        memberCount: updatedMembers.length,
        updatedAt: new Date(),
      });
      return response;
    } catch (error) {
      console.error('Error adding member:', error);
      throw error;
    }
  },

  /**
   * Remove a member from a group
   */
  async removeMember(groupId: string, userId: string) {
    try {
      const group = await this.getGroup(groupId);
      const updatedMembers = group.members.filter(
        (member) => member.userId !== userId
      );
      const response = await this.updateGroup(groupId, {
        members: updatedMembers,
        memberCount: updatedMembers.length,
        updatedAt: new Date(),
      });
      return response;
    } catch (error) {
      console.error('Error removing member:', error);
      throw error;
    }
  },

  /**
   * Update a member's role in a group
   */
  async updateMemberRole(groupId: string, userId: string, newRole: GroupMember['role']) {
    try {
      const group = await this.getGroup(groupId);
      const updatedMembers = group.members.map((member) =>
        member.userId === userId ? { ...member, role: newRole } : member
      );
      const response = await this.updateGroup(groupId, {
        members: updatedMembers,
        updatedAt: new Date(),
      });
      return response;
    } catch (error) {
      console.error('Error updating member role:', error);
      throw error;
    }
  },

  /**
   * Add a prayer to a group
   */
  async addPrayer(groupId: string, prayer: GroupPrayer) {
    try {
      const group = await this.getGroup(groupId);
      const updatedPrayers = [...group.prayers, prayer];
      const response = await this.updateGroup(groupId, {
        prayers: updatedPrayers,
        updatedAt: new Date(),
      });
      return response;
    } catch (error) {
      console.error('Error adding prayer:', error);
      throw error;
    }
  },

  /**
   * Remove a prayer from a group
   */
  async removePrayer(groupId: string, prayerId: string) {
    try {
      const group = await this.getGroup(groupId);
      const updatedPrayers = group.prayers.filter(
        (prayer) => prayer.id !== prayerId
      );
      const response = await this.updateGroup(groupId, {
        prayers: updatedPrayers,
        updatedAt: new Date(),
      });
      return response;
    } catch (error) {
      console.error('Error removing prayer:', error);
      throw error;
    }
  },

  /**
   * Search groups by name or description
   */
  async searchGroups(searchTerm: string, { limit = 10, offset = 0 } = {}) {
    try {
      const response = await databases.listDocuments<Group>(
        databaseId,
        collectionId,
        [
          Query.search('name', searchTerm),
          Query.limit(limit),
          Query.offset(offset),
        ]
      );
      return response;
    } catch (error) {
      console.error('Error searching groups:', error);
      throw error;
    }
  },

  /**
   * Get groups by category
   */
  async getGroupsByCategory(category: Group['category'], { limit = 10, offset = 0 } = {}) {
    try {
      const response = await databases.listDocuments<Group>(
        databaseId,
        collectionId,
        [
          Query.equal('category', category),
          Query.limit(limit),
          Query.offset(offset),
        ]
      );
      return response;
    } catch (error) {
      console.error('Error getting groups by category:', error);
      throw error;
    }
  },

  /**
   * Get user's groups (where they are a member)
   */
  async getUserGroups(userId: string, { limit = 10, offset = 0 } = {}) {
    try {
      const response = await databases.listDocuments<Group>(
        databaseId,
        collectionId,
        [
          Query.search('members', userId),
          Query.limit(limit),
          Query.offset(offset),
        ]
      );
      return response;
    } catch (error) {
      console.error('Error getting user groups:', error);
      throw error;
    }
  },
};
