'use client';

import { Button, Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useState, useEffect, useRef } from 'react';

export const Navigator = ({ currentPage, numPages, skipToLocation }: {
  currentPage: number;
  numPages: number | undefined;
  skipToLocation: (location: string | number, shouldPause?: boolean) => void;
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(value);
  };

  const handleInputConfirm = () => {
    if (inputValue === '') return; // Don't do anything if input is empty
    let page = parseInt(inputValue, 10);
    if (isNaN(page)) return;
    const maxPage = numPages || 1;
    if (page < 1) page = 1;
    if (page > maxPage) page = maxPage;
    if (page !== currentPage) {
      skipToLocation(page, true);
    }
    setInputValue(''); // Clear input after confirming
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputConfirm();
      inputRef.current?.blur();
    }
  };

  const handlePopoverOpen = () => {
    setInputValue(''); // Clear input when popup opens
  };

  return (
    <div className="flex items-center space-x-1">
      {/* Page back */}
      <Button
        onClick={() => skipToLocation(currentPage - 1, true)}
        disabled={currentPage <= 1}
        className="relative p-2 rounded-full text-foreground hover:bg-offbase data-[hover]:bg-offbase data-[active]:bg-offbase/80 transition-colors duration-200 focus:outline-none disabled:opacity-50"
        aria-label="Previous page"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </Button>

      {/* Page number popup */}
      <Popover className="relative">
        <PopoverButton
          className="bg-offbase px-2 py-0.5 rounded-full focus:outline-none cursor-pointer hover:bg-offbase/80"
          onClick={handlePopoverOpen}
        >
          <p className="text-xs whitespace-nowrap">
            {currentPage} / {numPages || 1}
          </p>
        </PopoverButton>
        <PopoverPanel anchor="top" className="absolute z-50 bg-base p-3 rounded-md shadow-lg border border-offbase">
          <div className="flex flex-col space-y-2">
            <div className="text-xs font-medium text-foreground">Go to page</div>
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-20 px-2 py-1 text-xs text-accent bg-offbase rounded border-none outline-none appearance-none text-center"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onKeyDown={handleInputKeyDown}
              placeholder={currentPage.toString()}
              aria-label="Page number"
            />
            <div className="text-xs text-foreground/70 text-center">of {numPages || 1}</div>
          </div>
        </PopoverPanel>
      </Popover>

      {/* Page forward */}
      <Button
        onClick={() => skipToLocation(currentPage + 1, true)}
        disabled={currentPage >= (numPages || 1)}
        className="relative p-2 rounded-full text-foreground hover:bg-offbase data-[hover]:bg-offbase data-[active]:bg-offbase/80 transition-colors duration-200 focus:outline-none disabled:opacity-50"
        aria-label="Next page"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </Button>
    </div>
  );
}