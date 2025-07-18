import { useState } from 'react';

import useListModalStore from '@/resources/stores/listModalStore';
import useListStore from '@/resources/stores/listStore';

import CloseButton from './CloseButton';

const ListModal = () => {
  const { closeListModal } = useListModalStore();
  const { createList } = useListStore();

  const [listLabel, setListLabel] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Add new list item.
    createList({
      label: listLabel
    });

    // Reset.
    setListLabel('');
    closeListModal();
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center">
      <div className="w-full max-w-screen-sm bg-white p-4 rounded relative">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <fieldset className="flex flex-col gap-2">
            <legend className="font-bold text-lg w-full mb-2">Add List</legend>
            <label className="text-sm">
              Label
              <input
                className="text-sm border border-gray-400 p-2 w-full"
                name="label"
                type="text"
                onChange={(event) => setListLabel(event.target.value)}
              />
            </label>
            <input
              type="submit"
              value="Submit"
              className="button ml-auto mt-2"
            />
          </fieldset>
        </form>
        <CloseButton onClick={closeListModal} />
      </div>
    </div>
  );
};

export default ListModal;
