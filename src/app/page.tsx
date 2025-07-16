'use client';

import useModalStore from '@/resources/stores/listModalStore';
import useListStore from '@/resources/stores/listStore';
import useAddCardModalStore from '@/resources/stores/addCardModalStore';
import useCardModalStore from '@/resources/stores/cardModal';

import Header from '@/resources/blocks/Header';
import List from '@/resources/components/List';
import Button from '@/resources/components/Button';
import ListModal from '@/resources/components/ListModal';
import AddCardModal from '@/resources/components/AddCardModal';
import CardModal from '@/resources/components/CardModal';

/**
 *
 */
export default function Page() {
  const { listModalIsOpen, openListModal } = useModalStore();
  const { lists } = useListStore();
  const { addCardModalIsOpen } = useAddCardModalStore();
  const { cardModalIsOpen, card } = useCardModalStore();

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
        {lists.length > 0 && (
          <ul className="flex gap-4 mt-4">
            {lists.map((item) => (
              <List key={item.id} {...item} />
            ))}
          </ul>
        )}
      </main>
      {listModalIsOpen && <ListModal />}
      {addCardModalIsOpen && <AddCardModal />}
      {cardModalIsOpen && <CardModal {...card} />}
    </>
  );
}
