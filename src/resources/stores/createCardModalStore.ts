import { create } from 'zustand';

type CreateCardModalStore = {
  createCardModalIsOpen: boolean;
  list_id: number | null;
  openCreateCardModal: (list_id: number) => void;
  closeCreateCardModal: () => void;
};

const useCreateCardModalStore = create<CreateCardModalStore>((set) => ({
  createCardModalIsOpen: false,
  list_id: null,
  openCreateCardModal: (list_id) =>
    set({ createCardModalIsOpen: true, list_id }),
  closeCreateCardModal: () => set({ createCardModalIsOpen: false })
}));

export default useCreateCardModalStore;
