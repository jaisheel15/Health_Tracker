import { Link } from 'react-router-dom';

const Navbar = () => {
    const links = [
        { to: '/', label: 'Dashboard' },
        { to: '/exercise', label: 'Exercise' },
        { to: '/nutrition', label: 'Nutrition' },
        { to: '/goals', label: 'Goals' },
    ];

  return (
    <nav className="w-64 bg-blue-800 p-4 flex flex-col space-y-2">
        {links.map((link)=>(
        <Link key={link.label} to={link.to} className='text-white px-4 py-2 rounded hover:bg-blue-900 transition border-b-2 border-blue-600' >{link.label}</Link>   
        ))}
    </nav>
  );
};

export default Navbar;