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
        className="px-3 py-1 bg-blue-400 hover:bg-blue-500 text-white-600 text-sm"
        disabled={!hasPrevPage}
        onClick={onPrevPage}
      >
        Previous
      </Button>
      <span className="text-sm text-gray-600">Page {currentPage}</span>
      <Button
        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm"
        disabled={!hasNextPage}
        onClick={onNextPage}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
