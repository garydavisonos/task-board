import { create } from 'zustand';

type AddCardModalState = {
  addCardModalIsOpen: boolean;
  listId: number | null;
  openAddCardModal: (listId: number) => void;
  closeAddCardModal: () => void;
};

const useAddCardModalStore = create<AddCardModalState>((set) => ({
  addCardModalIsOpen: false, 
  listId: null,
  openAddCardModal: (listId) => set({ addCardModalIsOpen: true, listId }),
  closeAddCardModal: () => set({ addCardModalIsOpen: false }),
}));

export default useAddCardModalStore;