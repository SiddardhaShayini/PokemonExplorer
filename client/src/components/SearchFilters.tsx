import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Search } from 'lucide-react';
import { POKEMON_TYPES } from '@/lib/pokemonTypes';

interface SearchFiltersProps {
  searchTerm: string;
  selectedType: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onClearSearch: () => void;
  onClearType: () => void;
  onClearAll: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  selectedType,
  onSearchChange,
  onTypeChange,
  onClearSearch,
  onClearType,
  onClearAll,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleTypeChange = (value: string) => {
    onTypeChange(value);
  };

  const hasFilters = searchTerm || (selectedType && selectedType !== 'all');

  return (
    <div className="mb-8 bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        {/* Search input */}
        <div className="relative flex-grow mb-4 md:mb-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Pokémon..."
            className="pl-10"
          />
        </div>

        {/* Type filter */}
        <div className="relative w-full md:w-48">
          <Select
            value={selectedType}
            onValueChange={handleTypeChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {POKEMON_TYPES.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active filters display */}
      {hasFilters && (
        <div className="mt-4 flex items-center text-sm text-gray-600">
          <span className="mr-2">Active filters:</span>
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <Badge variant="outline" className="bg-pokered bg-opacity-10 text-pokered border-pokered">
                Search: {searchTerm}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 p-0 hover:bg-transparent"
                  onClick={onClearSearch}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedType && selectedType !== 'all' && (
              <Badge variant="outline" className="bg-opacity-10 border-current" style={{ backgroundColor: `var(--type${selectedType.toLowerCase()})`, color: `var(--type${selectedType.toLowerCase()})` }}>
                Type: {selectedType}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 p-0 hover:bg-transparent"
                  onClick={onClearType}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-6 ml-2 text-gray-500"
                onClick={onClearAll}
              >
                Clear all
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
