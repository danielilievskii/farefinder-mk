import * as React from "react";
import {Search, RefreshCw} from 'lucide-react';
import {Button} from '@/components/ui/button';

interface SearchButtonProps {
  onClick: () => void;
  isDisabled?: boolean;
  isSearching?: boolean;
  searchingText?: string;
  idleText?: string;
}

const SearchButton: React.FC<SearchButtonProps> = ({
                                                     onClick,
                                                     isDisabled,
                                                     isSearching,
                                                     searchingText,
                                                     idleText
                                                   }) => {
  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      className={`w-full font-bold text-md bg-primary hover:bg-primary/90`}
    >
      {isSearching ? (
        <>
          <RefreshCw className="w-4 h-4 mr-2 animate-spin"/>
          {searchingText}
        </>
      ) : (
        <>
          <Search className="w-4 h-4 mr-2"/>
          {idleText}
        </>
      )}
    </Button>
  );
};

export default SearchButton;