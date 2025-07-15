import { TextButtonProps } from "@/resources/types/TextButtonProps";

const TextButton = ({ label, className, onClick = () => {} } : TextButtonProps) => {
    return (
        <button className={`underline hover:no-underline cursor-pointer ${className}`} onClick={onClick}>{label}</button>
    )
}

export default TextButton;