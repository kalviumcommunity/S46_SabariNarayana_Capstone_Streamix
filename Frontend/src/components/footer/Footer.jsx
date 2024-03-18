import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-black py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row">
        <div className="flex-1 mb-8 md:mb-0">
          <div className="logo font-koulen text-6xl text-white">
          <a href="/">Streamix</a>
        </div>
          <p className="text-gray-400">
            Empowering YouTube creators and administrators 
            to seamlessly collaborate, innovate,  and elevate content creation.
          </p>
        </div>
        <div className="flex-1 mb-8 md:mb-0 md:mx-8">
          <h4 className="text-white font-bold mb-4">Useful Links</h4>
          <ul className="text-gray-400">
            <li className="mb-2">
              <a href="#">Home</a>
            </li>
            <li className="mb-2">
              <a href="#">Featured</a>
            </li>
            <li className="mb-2">
              <a href="#">About Us</a>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <h4 className="text-white font-bold mb-4">Contact Us</h4>
          <ul className="text-gray-400">
            <li className="mb-2">
              123 Main Street,
              Anytown USA
            </li>
            <li className="mb-2">
              +1 (555) 123-4567
            </li>
            <li>
              info@example.com
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};