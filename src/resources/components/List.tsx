import { useEffect, useState } from 'react';

import { ListProps } from "@/resources/types/ListProps";
import useListStore from '@/resources/stores/listStore';
import useAddCardModalStore from "@/resources/stores/addCardModalStore";

import Button from "./Button";
import Card from "./Card";
import CloseButton from "./CloseButton";
import { CardProps } from '../types/CardProps';

const List = ({cards, label, id} : ListProps) => {
    const { removeList, lists, removeCard, addCard } = useListStore();
    const { openAddCardModal } = useAddCardModalStore();
    const [ newListId, setNewListId] = useState<number | null>(null);
    const [ cardsToMove, setCardsToMove ] = useState<CardProps[]>([]);

    const onClickAddCard = (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
    
        const { dataset } = event.target as HTMLInputElement;
        let { id = 0 } = dataset;
        id = +id;

        // Check if the card is already in cardsToMove.
        const isCardInMoveList = cardsToMove.some((item) => item.id === id);

        if (isCardInMoveList) {
            // Remove the card from cardsToMove.
            setCardsToMove(cardsToMove.filter((item) => item.id !== id));
        } else {
            // Add the card to cardsToMove.
            const card = cards.filter(card => card.id === id)[0];

            setCardsToMove([...cardsToMove, card]);
        }
        
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewListId(+event.target.value);
    };

    const onClickMove = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (newListId) {
            removeCard()
        }

    }

    useEffect(() => {

        console.table(cardsToMove);

    }, [cardsToMove])

    return (
        <li className="bg-gray-200 w-full max-w-[250px] rounded p-4 flex flex-col gap-4 relative">
            <h3>{label}</h3>
            {cards.map(item => {
                 return (
                    <div key={item.id} className="flex gap-2">
                        <input type="checkbox" data-id={item.id} onClick={event => onClickAddCard(event)} />
                        <Card key={item.id} {...item} listId={id} />
                    </div>
                 )
            })}
            <Button label="Add Card" type="secondary" onClick={() => openAddCardModal(id)} />
            {cardsToMove.length > 0 && (
                <>
                    <select onChange={handleChange}>
                        {lists.map(list => <option key={list.id} value={list.id}>{list.label}</option>)}
                    </select>
                    <Button label="Move Card(s)" type="tertiary" />
                </>
            )}
            <CloseButton onClick={() => removeList(id)} />
        </li>
    )
}

export default List;