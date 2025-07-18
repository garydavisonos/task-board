import { useEffect, useState, useCallback } from 'react';

import { ListProps } from '@/resources/types/ListProps';
import useListStore from '@/resources/stores/listStore';
import useCreateCardModalStore from '@/resources/stores/createCardModalStore';

import Button from './Button';
import Card from './Card';
import CloseButton from './CloseButton';
import { CardProps } from '../types/CardProps';
import TextButton from './TextButton';

const List = ({ cards, label, id }: ListProps) => {
  const { removeList, lists, removeCard, createCard } = useListStore();
  const { openCreateCardModal } = useCreateCardModalStore();
  const [newListId, setNewListId] = useState<number | null>(null);
  const [selectedCards, setSelectedCards] = useState<CardProps[]>([]);
  const [moveCards, setMoveCards] = useState<boolean>(false);
  const [moveButton, setMoveButton] = useState<boolean>(false);

  const handleOnClickSelectCards = (
    event: React.MouseEvent<HTMLInputElement>
  ) => {
    const { dataset } = event.target as HTMLInputElement;
    let { id = 0 } = dataset;
    id = +id;

    // Check if the card is already in cardsToMove.
    const isCardInSelectedList = selectedCards.some((item) => item.id === id);

    if (isCardInSelectedList) {
      // Remove the card from cardsToMove.
      setSelectedCards(selectedCards.filter((item) => item.id !== id));
    } else {
      // Add the card to cardsToMove.
      const card = cards.filter((card) => card.id === id)[0];

      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleOnClickMoveCards = () => {
    if (selectedCards.length > 0 && newListId) {
      selectedCards.map((card) => {
        // Remove from current list.
        removeCard(id, card.id);

        // Add to new list.
        createCard(newListId, card);

        // Reset.
        setNewListId(null);
        setMoveButton(false);
        setMoveCards(false);
        setSelectedCards([]);
      });
    }
  };

  const handleOnClickDeleteCards = () => {
    if (selectedCards.length > 0) {
      selectedCards.forEach((card) => {
        // Remove from current list.
        removeCard(id, card.id);

        // Reset.
        setSelectedCards([]);
      });
    }
  };

  const handleChangeSelectList = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      event.preventDefault();
      const { value } = event.target;

      if (value) {
        // Set Id.
        setNewListId(+value);
      }
    },
    []
  );

  const handleCreateCard = useCallback(() => {
    openCreateCardModal(id);
  }, [openCreateCardModal, id]);

  const handleCloseList = useCallback(() => {
    removeList(id);
  }, [removeList, id]);

  useEffect(() => {
    if (newListId === null) return;

    // Show Move Button.
    setMoveButton(true);
  }, [newListId]);

  return (
    <li className="bg-gray-200 w-full max-w-[250px] rounded p-4 flex flex-col gap-4 relative">
      <h3>{label}</h3>
      {cards.map((item) => {
        return (
          <div key={item.id} className="flex gap-2">
            <input
              type="checkbox"
              data-id={item.id}
              onClick={handleOnClickSelectCards}
            />
            <Card key={item.id} {...item} list_id={id} />
          </div>
        );
      })}
      <Button label="Create Card" type="secondary" onClick={handleCreateCard} />
      {selectedCards.length > 0 && (
        <ul className="flex text-xs gap-4">
          <li>
            <TextButton
              label="Move Card(s)"
              className="text-blue-500"
              onClick={() => setMoveCards(true)}
            />
          </li>
          <li>
            <TextButton
              label="Delete Card(s)"
              className="text-red-500"
              onClick={handleOnClickDeleteCards}
            />
          </li>
        </ul>
      )}
      {moveCards && (
        <>
          <label className="text-xs flex flex-col">
            Select list
            <select
              onChange={handleChangeSelectList}
              className="border border-gray-400 bg-white"
              defaultValue="Please select"
            >
              <option value="Please select" disabled={true}>
                Please select
              </option>
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.label}
                </option>
              ))}
            </select>
          </label>
          {moveButton && (
            <Button
              label="Move"
              type="tertiary"
              onClick={handleOnClickMoveCards}
            />
          )}
        </>
      )}
      <CloseButton onClick={handleCloseList} />
    </li>
  );
};

export default List;
