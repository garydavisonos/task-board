import { useState, useCallback } from 'react';

import { CardProps } from '@/resources/types/CardProps';
import useCardModalStore from '@/resources/stores/cardModal';
import useListStore from '@/resources/stores/listStore';

import CloseButton from './CloseButton';
import TextButton from './TextButton';

const CardModal = ({
  label,
  description,
  deadline,
  list_id,
  id,
  completed
}: CardProps) => {
  const { closeCardModal } = useCardModalStore();
  const { updateCard } = useListStore();
  const [readOnly, setReadOnly] = useState(true);

  // Convert datetime to date format for the input.
  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return '';
    // Convert "2025-07-27T00:00:00.000Z" to "2025-07-27"
    return new Date(dateString).toISOString().split('T')[0];
  };

  const [card, setCard] = useState({
    label,
    description,
    deadline: formatDateForInput(deadline),
    list_id,
    id,
    completed
  });

  const handleOnClickEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Make editable.
    setReadOnly(false);
  };

  const handleOnClickComplete = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    // Mark complete.
    updateCard(id, { ...card, completed: true });

    // Send mock email.
    sendCompleteEmail(id);

    closeCardModal();
  };

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setCard((prevCard) => ({ ...prevCard, [name]: value }));
    },
    []
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Update card.
    updateCard(id, card);

    // Reset.
    setReadOnly(true);
    closeCardModal();
  };

  const sendCompleteEmail = async (id: number) => {
    try {
      const res = await fetch('/api/complete-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'name@companyname.com',
          taskId: id
        })
      });

      if (res.status === 200) {
        console.log('Email successfully sent');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center">
      <div className="w-full max-w-screen-sm bg-white p-4 rounded relative">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex">
            <ul className="ml-auto flex gap-2 text-xs">
              <li>
                <TextButton
                  label="Edit"
                  className="text-blue-500"
                  onClick={handleOnClickEdit}
                />
              </li>
              <li>
                <TextButton
                  label="Complete"
                  className="text-green-500"
                  onClick={handleOnClickComplete}
                />
              </li>
            </ul>
          </div>
          <input
            type="text"
            name="label"
            readOnly={readOnly}
            value={card.label}
            onChange={handleInputChange}
            required={true}
          />
          <input
            type="text"
            name="description"
            readOnly={readOnly}
            value={card.description}
            onChange={handleInputChange}
            required={true}
          />
          <input
            type="date"
            name="deadline"
            readOnly={readOnly}
            value={card.deadline}
            onChange={handleInputChange}
            required={true}
          />
          {!readOnly && (
            <input
              type="submit"
              value="Submit"
              className="button ml-auto mt-2"
            />
          )}
        </form>
        <CloseButton onClick={closeCardModal} />
      </div>
    </div>
  );
};

export default CardModal;
