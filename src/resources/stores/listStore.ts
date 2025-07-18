import { create } from 'zustand';
import { ListProps } from '@/resources/types/ListProps';
import { listService, CreateListData } from '@/services/listService';
import {
  cardService,
  CreateCardData,
  UpdateCardData
} from '@/services/cardService';

type ListState = {
  lists: ListProps[];
  loading: boolean;
  error: string | null;
  // List methods
  fetchLists: () => Promise<void>;
  createList: (data: CreateListData) => Promise<void>;
  updateList: (list_id: number, data: Partial<CreateListData>) => Promise<void>;
  removeList: (list_id: number) => Promise<void>;
  // Card methods
  createCard: (list_id: number, card: CreateCardData) => Promise<void>;
  removeCard: (list_id: number, cardId: number) => Promise<void>;
  updateCard: (cardId: number, updatedCard: UpdateCardData) => Promise<void>;
};

const useListStore = create<ListState>((set) => ({
  lists: [],
  loading: false,
  error: null,

  // Fetch all lists with their cards from the API.
  fetchLists: async () => {
    set({ loading: true, error: null });
    try {
      const lists = await listService.getAllLists();

      // Get Cards.
      if (lists.length > 0) {
        await Promise.all(
          lists.map(async (list) => {
            try {
              list.cards = await cardService.getCardsByListId(list.id);
            } catch (error) {
              console.error(error);
              list.cards = [];
            }
          })
        );
      }

      // For now, assuming lists come with cards from your API.
      set({ lists, loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, loading: false });
      console.error('Error fetching lists:', error);
    }
  },

  // Create a new list
  createList: async (data: CreateListData) => {
    set({ loading: true, error: null });
    try {
      const newList = await listService.createList(data);
      // Initialize with empty cards array if not provided.
      const listWithCards = { ...newList, cards: newList.cards || [] };
      set((state) => ({
        lists: [...state.lists, listWithCards],
        loading: false
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, loading: false });
      console.error('Error creating list:', error);
    }
  },

  // Update an existing list.
  updateList: async (list_id: number, data: Partial<CreateListData>) => {
    set({ loading: true, error: null });
    try {
      const updatedList = await listService.updateList(list_id, data);
      set((state) => ({
        lists: state.lists.map((list) =>
          list.id === list_id ? { ...list, ...updatedList } : list
        ),
        loading: false
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, loading: false });
      console.error('Error updating list:', error);
    }
  },

  // Remove a list.
  removeList: async (list_id: number) => {
    set({ loading: true, error: null });
    try {
      await listService.deleteList(list_id);
      set((state) => ({
        lists: state.lists.filter((list) => list.id !== list_id),
        loading: false
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, loading: false });
      console.error('Error removing list:', error);
    }
  },

  // Add a card to a list.
  createCard: async (list_id: number, cardData: CreateCardData) => {
    set({ loading: true, error: null });
    try {
      const newCard = await cardService.createCard({ ...cardData, list_id });
      set((state) => ({
        lists: state.lists.map((list) =>
          list.id === list_id
            ? { ...list, cards: [...list.cards, newCard] }
            : list
        ),
        loading: false
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, loading: false });
      console.error('Error creating card:', error);
    }
  },

  // Remove a card from a list.
  removeCard: async (list_id: number, cardId: number) => {
    set({ loading: true, error: null });
    try {
      await cardService.deleteCard(cardId);
      set((state) => ({
        lists: state.lists.map((list) =>
          list.id === list_id
            ? {
                ...list,
                cards: list.cards.filter((card) => card.id !== cardId)
              }
            : list
        ),
        loading: false
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, loading: false });
      console.error('Error removing card:', error);
    }
  },

  // Update a card.
  updateCard: async (cardId: number, updatedCard: UpdateCardData) => {
    set({ loading: true, error: null });
    try {
      const updated = await cardService.updateCard(cardId, updatedCard);
      set((state) => ({
        lists: state.lists.map((list) => ({
          ...list,
          cards: list.cards.map((card) => (card.id === cardId ? updated : card))
        })),
        loading: false
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, loading: false });
      console.error('Error updating card:', error);
    }
  }
}));

export default useListStore;
