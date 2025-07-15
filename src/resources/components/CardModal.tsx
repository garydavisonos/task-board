import { useState } from 'react';

import { CardProps } from '@/resources/types/CardProps';
import useCardModalStore from '@/resources/stores/cardModal';
import useListStore from '@/resources/stores/listStore';

import CloseButton from './CloseButton';
import TextButton from './TextButton';

const CardModal = ({label, description, deadline, listId, id, completed}: CardProps) => {
    const {closeCardModal} = useCardModalStore();
    const {updateCard} = useListStore();
    const [readOnly, setReadOnly] = useState(true);
    const [card, setCard] = useState({label, description, deadline, listId, id, completed})

    const onClickEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        
        // Make editable.
        setReadOnly(false);
    }

    const onClickComplete = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        
        // Mark complete.
        updateCard(listId, id, {...card, completed: true});
        closeCardModal();
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Update card.
        updateCard(listId, id, card);

        // Reset.
        setReadOnly(true);
        closeCardModal();
    }

    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center">
            <div className="w-full max-w-screen-sm bg-white p-4 rounded relative">
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className='flex'>
                        <ul className="ml-auto flex gap-2 text-xs">
                            <li><TextButton label="Edit" className="text-blue-500" onClick={event => onClickEdit(event)} /></li>
                            <li><TextButton label="Complete" className="text-green-500" onClick={event => onClickComplete(event)} /></li>
                        </ul>
                    </div>
                    <input type='text' name="label" readOnly={readOnly} value={card.label} onChange={(event) => setCard({...card, label: event.target.value})} />
                    <input type='text' name="description" readOnly={readOnly} value={card.description} onChange={(event) => setCard({...card, description: event.target.value})} />
                    <input type='date' name="date" readOnly={readOnly} value={card.deadline} onChange={(event) => setCard({...card, deadline: event.target.value})} />
                    {!readOnly && <input type="submit" value="Submit" className="button ml-auto mt-2" />}
                </form>
                <CloseButton onClick={closeCardModal} />
            </div>
        </div>
    )
}

export default CardModal;