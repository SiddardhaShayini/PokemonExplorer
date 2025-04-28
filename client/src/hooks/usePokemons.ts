import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { Pokemon } from '@/types/pokemon';

interface UsePokemonsProps {
  searchTerm: string;
  selectedType: string;
}

export const usePokemons = ({ searchTerm, selectedType }: UsePokemonsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // Number of Pokemon per page
  
  const { data: pokemons, isLoading, error } = useQuery({
    queryKey: ['/api/pokemon'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const filteredPokemons = useMemo(() => {
    if (!pokemons) return [];
    
    // Apply filters
    let filtered = pokemons as Pokemon[];
    
    // Filter by name
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(pokemon => 
        pokemon.name.toLowerCase().includes(term)
      );
    }
    
    // Filter by type
    if (selectedType && selectedType !== 'all') {
      filtered = filtered.filter(pokemon => 
        pokemon.types.some(typeInfo => 
          typeInfo.type.name.toLowerCase() === selectedType.toLowerCase()
        )
      );
    }
    
    // Paginate
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filtered.slice(startIndex, endIndex);
  }, [pokemons, searchTerm, selectedType, currentPage, pageSize]);

  // Total filtered pokemons count
  const totalFilteredPokemons = useMemo(() => {
    if (!pokemons) return 0;
    
    let filtered = pokemons as Pokemon[];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(pokemon => 
        pokemon.name.toLowerCase().includes(term)
      );
    }
    
    if (selectedType && selectedType !== 'all') {
      filtered = filtered.filter(pokemon => 
        pokemon.types.some(typeInfo => 
          typeInfo.type.name.toLowerCase() === selectedType.toLowerCase()
        )
      );
    }
    
    return filtered.length;
  }, [pokemons, searchTerm, selectedType]);

  const totalPages = Math.ceil(totalFilteredPokemons / pageSize);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const goToNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType]);

  return {
    pokemons: pokemons || [],
    filteredPokemons,
    isLoading,
    error,
    currentPage,
    pageSize,
    totalPokemons: pokemons?.length || 0,
    totalFilteredPokemons,
    hasNextPage,
    hasPrevPage,
    goToNextPage,
    goToPrevPage
  };
};
