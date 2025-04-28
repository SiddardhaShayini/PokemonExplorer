import React from 'react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage,
}) => {
  return (
    <div className="mt-8 flex items-center justify-between">
      <Button
        variant="outline"
        className="px-3 py-1 text-sm"
        disabled={!hasPrevPage}
        onClick={onPrevPage}
      >
        Previous
      </Button>
      <span className="text-sm text-gray-600">Page {currentPage}</span>
      <Button
        className="px-3 py-1 bg-pokeblue hover:bg-blue-700 text-white text-sm"
        disabled={!hasNextPage}
        onClick={onNextPage}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
