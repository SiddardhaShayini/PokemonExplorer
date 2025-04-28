import React from 'react';
import Header from '@/components/Header';
import SearchFilters from '@/components/SearchFilters';
import PokemonGrid from '@/components/PokemonGrid';
import Pagination from '@/components/Pagination';
import Footer from '@/components/Footer';
import { usePokemons } from '@/hooks/usePokemons';
import { usePokemonFilters } from '@/hooks/usePokemonFilters';

const Home: React.FC = () => {
  const {
    searchTerm,
    selectedType,
    setSearchTerm,
    setSelectedType,
    clearSearchTerm,
    clearSelectedType,
    clearAllFilters
  } = usePokemonFilters();

  const {
    pokemons,
    filteredPokemons,
    isLoading,
    error,
    currentPage,
    pageSize,
    totalPokemons,
    hasNextPage,
    hasPrevPage,
    goToNextPage,
    goToPrevPage
  } = usePokemons({
    searchTerm,
    selectedType
  });
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-6 flex-grow">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-xl text-red-600 font-bold mb-4">Error loading data</h2>
            <p className="text-gray-600 mb-4">{error.message || "Failed to fetch Pokémon data"}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-pokeblue text-white rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 flex-grow">
        <SearchFilters
          searchTerm={searchTerm}
          selectedType={selectedType}
          onSearchChange={setSearchTerm}
          onTypeChange={setSelectedType}
          onClearSearch={clearSearchTerm}
          onClearType={clearSelectedType}
          onClearAll={clearAllFilters}
        />
        
        <PokemonGrid
          pokemons={filteredPokemons}
          isLoading={isLoading}
          filteredCount={filteredPokemons.length}
          totalCount={totalPokemons}
          onClearFilters={clearAllFilters}
        />
        
        {!isLoading && filteredPokemons.length > 0 && (
          <Pagination
            currentPage={currentPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onNextPage={goToNextPage}
            onPrevPage={goToPrevPage}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
