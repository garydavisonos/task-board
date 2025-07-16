import { useState, useCallback } from 'react';

import useAddCardModalStore from '@/resources/stores/addCardModalStore';
import useListStore from '@/resources/stores/listStore';
import { CardProps } from '@/resources/types/CardProps';

import CloseButton from './CloseButton';

const AddCardModal = () => {
  const { addCard } = useListStore();
  const { closeAddCardModal, listId } = useAddCardModalStore();

  const cardDefault: CardProps = {
    label: '',
    description: '',
    deadline: '',
    id: 0,
    listId: 0,
    completed: false
  };

  const [card, setCard] = useState<CardProps>(cardDefault);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      // Add Card.
      addCard(listId, {
        ...card,
        id: Date.now()
      });

      // Reset.
      setCard(cardDefault);
      closeAddCardModal();
    },
    [card, listId, addCard, closeAddCardModal]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setCard((prevCard) => ({ ...prevCard, [name]: value }));
    },
    []
  );

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center">
      <div className="w-full max-w-screen-sm bg-white p-4 rounded relative">
        <form onSubmit={handleSubmit}>
          <fieldset className="flex flex-col gap-2">
            <legend className="font-bold text-lg w-full mb-2">Add Card</legend>
            <label className="text-sm" htmlFor="label">
              Label
              <input
                id="label"
                name="label"
                className="border border-gray-400 p-2 w-full"
                onChange={handleInputChange}
                required={true}
              />
            </label>
            <label className="text-sm" htmlFor="description">
              Description
              <input
                id="description"
                name="description"
                className="border border-gray-400 p-2 w-full"
                type="text"
                onChange={handleInputChange}
                required={true}
              />
            </label>
            <label className="text-sm" htmlFor="deadline">
              Deadline
              <input
                id="deadline"
                name="deadline"
                className="text-sm border border-gray-400 p-2 w-full"
                type="date"
                onChange={handleInputChange}
                required={true}
              />
            </label>
            <input
              type="submit"
              value="Submit"
              className="button ml-auto mt-4"
            />
          </fieldset>
        </form>
        <CloseButton onClick={closeAddCardModal} />
      </div>
    </div>
  );
};

export default AddCardModal;
