import { Models } from 'appwrite';
import { Group, GroupMember, GroupPrayer } from '../schemas/groups';

export interface ApiResponse<T> {
  data: T;
  error: null | {
    code: number;
    message: string;
    type: string;
  };
}

export interface PaginatedResponse<T> extends Models.DocumentList<T> {
  total: number;
  documents: T[];
}

export interface GroupsApiResponses {
  createGroup: ApiResponse<Group>;
  getGroup: ApiResponse<Group>;
  updateGroup: ApiResponse<Group>;
  deleteGroup: ApiResponse<boolean>;
  listGroups: ApiResponse<PaginatedResponse<Group>>;
  addMember: ApiResponse<Group>;
  removeMember: ApiResponse<Group>;
  updateMemberRole: ApiResponse<Group>;
  addPrayer: ApiResponse<Group>;
  removePrayer: ApiResponse<Group>;
  searchGroups: ApiResponse<PaginatedResponse<Group>>;
  getGroupsByCategory: ApiResponse<PaginatedResponse<Group>>;
  getUserGroups: ApiResponse<PaginatedResponse<Group>>;
}

export interface GroupQueryParams {
  limit?: number;
  offset?: number;
  queries?: string[];
}

export interface GroupSearchParams extends GroupQueryParams {
  searchTerm: string;
}

export interface GroupCategoryParams extends GroupQueryParams {
  category: Group['category'];
}

export interface GroupMemberParams {
  groupId: string;
  userId: string;
  role?: GroupMember['role'];
}

export interface GroupPrayerParams {
  groupId: string;
  prayer: GroupPrayer;
}
