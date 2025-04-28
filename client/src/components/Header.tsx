import { FaGithub } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
            alt="Pokéball"
            className="w-8 h-8"
          />
          <h1 className="text-xl md:text-2xl font-bold">Pokémon Explorer</h1>
        </div>
        <div className="text-sm md:text-base">
          <span className="hidden md:inline">Powered by </span>
          <a 
            href="https://pokeapi.co/" 
            target="_blank" 
            rel="noreferrer"
            className="font-medium hover:underline"
          >
            PokéAPI
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
