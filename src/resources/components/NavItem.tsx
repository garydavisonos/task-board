import { NavItemProps } from '@/resources/types/NavItemProps';
import Link from 'next/link';

const UtilityNavLink = ({ href, label }: NavItemProps) => {
  return (
    <li>
      <Link href={href} className="underline hover:no-underline">
        {label}
      </Link>
    </li>
  );
};

export default UtilityNavLink;
