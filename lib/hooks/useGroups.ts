import { useState, useCallback, useEffect } from 'react';
import { groupsApi } from '../api/groups';
import { createApiResponse, handleApiError } from '../utils/error-handling';
import type {
  Group,
  GroupMember,
  GroupPrayer,
} from '../schemas/groups';
import type {
  ApiResponse,
  GroupQueryParams,
  GroupSearchParams,
  GroupCategoryParams,
  GroupMemberParams,
  GroupPrayerParams,
  PaginatedResponse,
} from '../types/api';

export const useGroups = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRequest = async <T>(
    request: Promise<T>
  ): Promise<ApiResponse<T>> => {
    try {
      setLoading(true);
      setError(null);
      const data = await request;
      return createApiResponse(data);
    } catch (err) {
      const error = handleApiError(err);
      setError(error);
      return createApiResponse(null, error);
    } finally {
      setLoading(false);
    }
  };

  const createGroup = useCallback(
    async (data: Partial<Group>) => {
      return handleRequest(groupsApi.createGroup(data));
    },
    []
  );

  const getGroup = useCallback(
    async (groupId: string) => {
      return handleRequest(groupsApi.getGroup(groupId));
    },
    []
  );

  const updateGroup = useCallback(
    async (groupId: string, data: Partial<Group>) => {
      return handleRequest(groupsApi.updateGroup(groupId, data));
    },
    []
  );

  const deleteGroup = useCallback(
    async (groupId: string) => {
      return handleRequest(groupsApi.deleteGroup(groupId));
    },
    []
  );

  const listGroups = useCallback(
    async (params?: GroupQueryParams) => {
      return handleRequest(groupsApi.listGroups(params));
    },
    []
  );

  const addMember = useCallback(
    async (groupId: string, member: GroupMember) => {
      return handleRequest(groupsApi.addMember(groupId, member));
    },
    []
  );

  const removeMember = useCallback(
    async ({ groupId, userId }: GroupMemberParams) => {
      return handleRequest(groupsApi.removeMember(groupId, userId));
    },
    []
  );

  const updateMemberRole = useCallback(
    async ({ groupId, userId, role }: GroupMemberParams) => {
      if (!role) throw new Error('Role is required');
      return handleRequest(groupsApi.updateMemberRole(groupId, userId, role));
    },
    []
  );

  const addPrayer = useCallback(
    async ({ groupId, prayer }: GroupPrayerParams) => {
      return handleRequest(groupsApi.addPrayer(groupId, prayer));
    },
    []
  );

  const removePrayer = useCallback(
    async (groupId: string, prayerId: string) => {
      return handleRequest(groupsApi.removePrayer(groupId, prayerId));
    },
    []
  );

  const searchGroups = useCallback(
    async ({ searchTerm, ...params }: GroupSearchParams) => {
      return handleRequest(groupsApi.searchGroups(searchTerm, params));
    },
    []
  );

  const getGroupsByCategory = useCallback(
    async ({ category, ...params }: GroupCategoryParams) => {
      return handleRequest(groupsApi.getGroupsByCategory(category, params));
    },
    []
  );

  const getUserGroups = useCallback(
    async (userId: string, params?: GroupQueryParams) => {
      return handleRequest(groupsApi.getUserGroups(userId, params));
    },
    []
  );

  return {
    loading,
    error,
    createGroup,
    getGroup,
    updateGroup,
    deleteGroup,
    listGroups,
    addMember,
    removeMember,
    updateMemberRole,
    addPrayer,
    removePrayer,
    searchGroups,
    getGroupsByCategory,
    getUserGroups,
  };
};

// Pagination hook for groups
export const useGroupsPagination = (initialParams?: GroupQueryParams) => {
  const [params, setParams] = useState<GroupQueryParams>(
    initialParams || { limit: 10, offset: 0 }
  );
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState<Group[]>([]);
  const { loading, error, listGroups } = useGroups();

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;

    const response = await listGroups(params);
    if (response.data) {
      const newItems = response.data.documents;
      setItems((prev) => [...prev, ...newItems]);
      setHasMore(newItems.length === params.limit);
      setParams((prev) => ({
        ...prev,
        offset: (prev.offset || 0) + (prev.limit || 10),
      }));
    }
  }, [params, hasMore, loading, listGroups]);

  const refresh = useCallback(async () => {
    setItems([]);
    setParams(initialParams || { limit: 10, offset: 0 });
    setHasMore(true);
    await loadMore();
  }, [initialParams, loadMore]);

  useEffect(() => {
    loadMore();
  }, []);

  return {
    items,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
};
