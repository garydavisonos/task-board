import { CardProps } from '@/resources/types/CardProps';
import TextButton from '@/resources/components/TextButton';

import useListStore from '@/resources/stores/listStore';
import useCardModalStore from '@/resources/stores/cardModal';
import classNames from 'classnames';

const Card = ({
  label,
  description,
  deadline,
  id,
  list_id,
  completed
}: CardProps) => {
  const { removeCard } = useListStore();
  const { openCardModal } = useCardModalStore();

  const handleViewClick = () => {
    openCardModal({
      label,
      description,
      deadline,
      id,
      list_id,
      completed
    });
  };

  const handleDeleteClick = () => {
    removeCard(list_id, id);
  };

  return (
    <article className="bg-white rounded text-sm p-4 flex items-center flex-1">
      <h3
        className={classNames('', {
          'line-through': completed
        })}
      >
        {label}
      </h3>
      <ul className="ml-auto flex gap-2 text-xs">
        {!completed && (
          <li>
            <TextButton
              label="View"
              className="text-blue-500"
              onClick={handleViewClick}
            />
          </li>
        )}
        <li>
          <TextButton
            label="Delete"
            className="text-red-500"
            onClick={handleDeleteClick}
          />
        </li>
      </ul>
    </article>
  );
};

export default Card;
