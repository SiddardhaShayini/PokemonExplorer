import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-300">
              This project uses the{' '}
              <a href="https://pokeapi.co/" className="text-pokeyellow hover:underline">
                PokéAPI
              </a>{' '}
              for data. Pokémon and Pokémon character names are trademarks of Nintendo.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white text-sm">
              About
            </a>
            <a 
              href="https://github.com/pokeapi/pokeapi" 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-300 hover:text-white text-sm"
            >
              GitHub
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
