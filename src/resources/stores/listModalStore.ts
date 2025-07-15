import { create } from 'zustand';

type ListModalState = {
  listModalIsOpen: boolean;
  openListModal: () => void;
  closeListModal: () => void;
};

const useListModalStore = create<ListModalState>((set) => ({
  listModalIsOpen: false,
  openListModal: () => set({ listModalIsOpen: true }),
  closeListModal: () => set({ listModalIsOpen: false }),
}));

export default useListModalStore;