import React from 'react';
import { Pokemon } from '@/types/pokemon';
import { formatHeight, formatWeight } from '@/lib/formatters';
import { Card, CardContent } from '@/components/ui/card';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const getTypeColor = (type: string) => {
    // Using CSS variables defined in index.css
    return `var(--type${type})`;
  };

  return (
    <Card className="pokemon-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <div className="absolute top-2 left-2 bg-pokeblue bg-opacity-80 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
          #{pokemon.id}
        </div>
        <div className="h-40 bg-gray-100 flex items-center justify-center">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="h-32 w-32 object-contain transform hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 capitalize">
          {pokemon.name}
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {pokemon.types.map((typeInfo) => (
            <span
              key={typeInfo.type.name}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium text-white capitalize"
              style={{ backgroundColor: getTypeColor(typeInfo.type.name) }}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-600 grid grid-cols-2 gap-2">
          <div>
            <span className="font-medium">Height:</span> {formatHeight(pokemon.height)}
          </div>
          <div>
            <span className="font-medium">Weight:</span> {formatWeight(pokemon.weight)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
