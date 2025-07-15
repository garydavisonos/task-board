import { NavItemProps } from "@/resources/types/NavItemProps";

const UtilityNavLink = ({ href , label } : NavItemProps) => {
    return (
        <li>
            <a href={href} className="underline hover:no-underline">{label}</a>
        </li>
    )
}

export default UtilityNavLink;