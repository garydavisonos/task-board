import { ListProps } from '@/resources/types/ListProps';

export interface CreateListData {
  label: string;
  description?: string;
}

export interface UpdateListData {
  label?: string;
  description?: string;
}

export const listService = {
  /**
   * Get all lists
   */
  async getAllLists(): Promise<ListProps[]> {
    const response = await fetch('/api/lists');
    if (!response.ok) {
      throw new Error(`Failed to fetch lists: ${response.status}`);
    }
    return response.json();
  },

  /**
   * Create a new list
   * @param data
   */
  async createList(data: CreateListData): Promise<ListProps> {
    const response = await fetch('/api/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to create list: ${response.status}`
      );
    }

    return response.json();
  },

  /**
   * Get a specific list by ID
   * @param id
   */
  async getListById(id: number): Promise<ListProps> {
    const response = await fetch(`/api/lists/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch list: ${response.status}`);
    }
    return response.json();
  },

  /**
   * Update a list
   * @param id
   * @param data
   */
  async updateList(id: number, data: UpdateListData): Promise<ListProps> {
    const response = await fetch(`/api/lists/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to update list: ${response.status}`
      );
    }

    return response.json();
  },

  /**
   * Delete a list
   * @param id
   */
  async deleteList(id: number): Promise<void> {
    const response = await fetch(`/api/lists/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to delete list: ${response.status}`
      );
    }
  }
};
