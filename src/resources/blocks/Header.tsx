import NavItem from '@/resources/components/NavItem';
import { NavItemProps } from '@/resources/types/NavItemProps';

const Header = () => {
  const utilityNavLinks: NavItemProps[] = [
    {
      href: '/',
      label: 'Page Name',
      id: 12
    },
    {
      href: '/',
      label: 'Page Name',
      id: 123
    }
  ];

  return (
    <header>
      <nav id="utility-nav" className="bg-gray-600 text-white">
        <ul className="flex justify-end gap-4 py-2 px-4 text-sm">
          {utilityNavLinks.map((item) => (
            <NavItem key={item.id} {...item} />
          ))}
        </ul>
      </nav>
      <div className="p-4 bg-gray-800 text-white text-2xl font-bold">
        Task Board
      </div>
    </header>
  );
};

export default Header;
