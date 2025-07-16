import { CardProps } from '@/resources/types/CardProps';
import { create } from 'zustand';

type CardModalState = {
  cardModalIsOpen: boolean;
  card: CardProps;
  openCardModal: (card: CardProps) => void;
  closeCardModal: () => void;
};

const useCardModalStore = create<CardModalState>((set) => ({
  cardModalIsOpen: false,
  card: {
    label: '',
    description: '',
    deadline: '',
    id: 0,
    listId: 0,
    completed: true
  },
  openCardModal: (card: CardProps) => set({ cardModalIsOpen: true, card }),
  closeCardModal: () => set({ cardModalIsOpen: false })
}));

export default useCardModalStore;
