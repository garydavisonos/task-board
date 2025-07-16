import classNames from 'classnames';
import { ButtonProps } from '@/resources/types/ButtonProps';

const Button = ({
  label,
  onClick = () => {},
  type = 'primary'
}: ButtonProps) => {
  return (
    <button
      className={classNames('button', {
        'button--primary': type == 'primary',
        'button--secondary': type == 'secondary',
        'button--tertiary': type == 'tertiary'
      })}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
