import { useState, useCallback } from 'react';

export const usePokemonFilters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const clearSearchTerm = useCallback(() => {
    setSearchTerm('');
  }, []);

  const clearSelectedType = useCallback(() => {
    setSelectedType('all');
  }, []);

  const clearAllFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedType('all');
  }, []);

  return {
    searchTerm,
    selectedType,
    setSearchTerm,
    setSelectedType,
    clearSearchTerm,
    clearSelectedType,
    clearAllFilters
  };
};
