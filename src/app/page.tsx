'use client';

import { useEffect } from 'react';
import useModalStore from '@/resources/stores/listModalStore';
import useListStore from '@/resources/stores/listStore';
import useCreateCardModalStore from '@/resources/stores/createCardModalStore';
import useCardModalStore from '@/resources/stores/cardModal';

import Header from '@/resources/blocks/Header';
import List from '@/resources/components/List';
import Button from '@/resources/components/Button';
import ListModal from '@/resources/components/ListModal';
import CreateCreateModal from '@/resources/components/CreateCardModal';
import CardModal from '@/resources/components/CardModal';

/**
 *
 */
export default function Page() {
  const { listModalIsOpen, openListModal } = useModalStore();
  const { lists, loading, error, fetchLists } = useListStore();
  const { createCardModalIsOpen } = useCreateCardModalStore();
  const { cardModalIsOpen, card } = useCardModalStore();

  // Fetch lists when component mounts.
  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  // Show loading state.
  if (loading) {
    return (
      <>
        <Header />
        <main className="p-4">
          <div className="flex gap-2 items-center">
            <span className="text-xl">⌛</span>
            <h1 className="text-xl font-bold">Loading...</h1>
          </div>
        </main>
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        <Header />
        <main className="p-4">
          <div className="flex gap-2 items-center">
            <span className="text-xl">❌</span>
            <h1 className="text-xl font-bold">Error: {error}</h1>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="p-4">
        <div className="flex gap-2 items-center">
          <span className="text-xl">📋</span>
          <h1 className="text-xl font-bold">Tasks</h1>
          <span className="ml-auto">
            <Button label="Add List" onClick={openListModal} />
          </span>
        </div>
        {lists.length > 0 ? (
          <ul className="flex gap-4 mt-4">
            {lists.map((item) => (
              <List key={item.id} {...item} />
            ))}
          </ul>
        ) : (
          <div className="mt-4">
            <p>No lists found. Create your first list!</p>
          </div>
        )}
      </main>
      {listModalIsOpen && <ListModal />}
      {createCardModalIsOpen && <CreateCreateModal />}
      {cardModalIsOpen && <CardModal {...card} />}
    </>
  );
}
