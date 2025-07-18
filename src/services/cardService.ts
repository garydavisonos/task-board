import { CardProps } from '@/resources/types/CardProps';

export interface CreateCardData {
  label: string;
  description: string;
  deadline?: string;
  list_id: number;
  completed?: boolean;
}

export interface UpdateCardData {
  label?: string;
  description?: string;
  deadline?: string;
  list_id?: number;
  completed?: boolean;
}

export const cardService = {
  /**
   * Get all cards
   */
  async getAllCards(): Promise<CardProps[]> {
    const response = await fetch('/api/cards');
    if (!response.ok) {
      throw new Error(`Failed to fetch cards: ${response.status}`);
    }
    return response.json();
  },

  /**
   * Create a new card
   * @param data
   */
  async createCard(data: CreateCardData): Promise<CardProps> {
    const response = await fetch('/api/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to create card: ${response.status}`
      );
    }

    return response.json();
  },

  /**
   * Get a specific card by ID
   * @param id
   */
  async getCardById(id: number): Promise<CardProps> {
    const response = await fetch(`/api/cards/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch card: ${response.status}`);
    }
    return response.json();
  },

  /**
   * Update a card
   * @param id
   * @param data
   */
  async updateCard(id: number, data: UpdateCardData): Promise<CardProps> {
    const response = await fetch(`/api/cards/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to update card: ${response.status}`
      );
    }

    return response.json();
  },

  /**
   * Delete a card
   * @param id
   */
  async deleteCard(id: number): Promise<void> {
    const response = await fetch(`/api/cards/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to delete card: ${response.status}`
      );
    }
  },

  /**
   * Mark a card as completed
   * @param id
   */
  async completeCard(id: number): Promise<CardProps> {
    return this.updateCard(id, { completed: true });
  },

  /**
   * Get cards by list ID
   * @param listId
   */
  async getCardsByListId(listId: number): Promise<CardProps[]> {
    const allCards = await this.getAllCards();
    return allCards.filter((card) => card.list_id === listId);
  }
};
