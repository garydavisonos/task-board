import { CloseButtonProps } from "../types/CloseButtonProps";

const CloseButton = ({onClick = () => {}} : CloseButtonProps) => {
    return (
        <button onClick={onClick} className="bg-white -top-4 -right-4 absolute p-2 rounded-full font-bold text-xs w-8 h-8 border bg-gray-400 cursor-pointer">X</button>
    )
}

export default CloseButton;