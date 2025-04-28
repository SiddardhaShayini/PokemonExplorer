import React from 'react';
import { Pokemon } from '@/types/pokemon';
import PokemonCard from './PokemonCard';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';

interface PokemonGridProps {
  pokemons: Pokemon[];
  isLoading: boolean;
  filteredCount: number;
  totalCount: number;
  onClearFilters: () => void;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemons,
  isLoading,
  filteredCount,
  totalCount,
  onClearFilters,
}) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (pokemons.length === 0) {
    return <EmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <>
      {/* Results count */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {filteredCount} Pokémon found
        </h2>
        <div className="text-sm text-gray-500">
          Showing {filteredCount} of {totalCount}
        </div>
      </div>

      {/* Pokemon Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
};

export default PokemonGrid;
