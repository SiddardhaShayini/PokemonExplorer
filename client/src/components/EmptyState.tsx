import React from 'react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onClearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png"
        alt="Psyduck"
        className="w-32 h-32 mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No Pokémon Found</h3>
      <p className="text-gray-600 max-w-md mb-6">
        We couldn't find any Pokémon matching your search criteria. Try adjusting your filters or search terms.
      </p>
      <Button 
        className="bg-pokeblue hover:bg-blue-700 text-white"
        onClick={onClearFilters}
      >
        Clear All Filters
      </Button>
    </div>
  );
};

export default EmptyState;
