import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ListProps } from '@/resources/types/ListProps';
import { CardProps } from '@/resources/types/CardProps';

type ListState = {
  hydrated: boolean;
  setHydrated: () => void;
  lists: ListProps[];
  addList: (list: ListProps) => void;
  removeList: (listId: number) => void;
  addCard: (listId: number | null, card: CardProps) => void;
  removeCard: (listId: number | null, cardId: number) => void;
  updateCard: (
    listId: number | null,
    cardId: number,
    updatedCard: CardProps
  ) => void;
};

const useListStore = create<ListState>()(
  persist(
    (set) => ({
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      lists: [
        {
          cards: [
            {
              label: 'Card 1.1',
              description: 'Lorem ipsum',
              deadline: '2025-07-16',
              id: 1,
              listId: 1,
              completed: false
            },
            {
              label: 'Card 1.2',
              description: 'Lorem ipsum',
              deadline: '2025-07-16',
              id: 12,
              listId: 1,
              completed: false
            },
            {
              label: 'Card 1.3',
              description: 'Lorem ipsum',
              deadline: '2025-07-16',
              id: 123,
              listId: 1,
              completed: false
            }
          ],
          id: 1,
          label: 'List 1'
        },
        {
          cards: [
            {
              label: 'Card 2.1',
              description: 'Lorem ipsum',
              deadline: '2025-08-15',
              id: 2,
              listId: 12,
              completed: false
            },
            {
              label: 'Card 2.2',
              description: 'Lorem ipsum',
              deadline: '2025-08-15',
              id: 22,
              listId: 12,
              completed: false
            },
            {
              label: 'Card 2.3',
              description: 'Lorem ipsum',
              deadline: '2025-08-15',
              id: 223,
              listId: 12,
              completed: false
            }
          ],
          id: 12,
          label: 'List 2'
        },
        {
          cards: [
            {
              label: 'Card 3.1',
              description: 'Lorem ipsum',
              deadline: '2025-07-14',
              id: 3,
              listId: 123,
              completed: false
            },
            {
              label: 'Card 3.2',
              description: 'Lorem ipsum',
              deadline: '2025-07-14',
              id: 32,
              listId: 123,
              completed: false
            },
            {
              label: 'Card 3.3',
              description: 'Lorem ipsum',
              deadline: '2025-07-14',
              id: 323,
              listId: 123,
              completed: false
            }
          ],
          id: 123,
          label: 'List 3'
        }
      ],
      addList: (list) =>
        set((state) => ({
          lists: [...state.lists, list]
        })),
      removeList: (listId) =>
        set((state) => ({
          lists: state.lists.filter((list) => list.id !== listId)
        })),
      addCard: (listId, card) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? { ...list, cards: [...list.cards, card] }
              : list
          )
        })),
      removeCard: (listId, cardId) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  cards: list.cards.filter((card) => card.id !== cardId)
                }
              : list
          )
        })),
      updateCard: (listId, cardId, updateCard) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  cards: list.cards.map((card) =>
                    card.id === cardId ? updateCard : card
                  )
                }
              : list
          )
        }))
    }),
    {
      name: 'list-storage'
    }
  )
);

export default useListStore;
