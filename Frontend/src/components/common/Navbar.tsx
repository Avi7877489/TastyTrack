import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../../data/logo.jpg'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img 
                className="h-16 w-auto" 
                src={logo}
                alt="Logo" 
              />
            </div>
          </div>
          <div className="flex items-center">
            <button className="rounded-button bg-custom text-white px-4 py-2 text-sm font-medium">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;