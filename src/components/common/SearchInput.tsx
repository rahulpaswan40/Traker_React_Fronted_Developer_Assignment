import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, XIcon } from './Icons';

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  debounceMs?: number;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search by ID, customer, driver...',
  value,
  onChange,
  debounceMs = 200,
  className = ''
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const isFirstMount = useRef(true);

  // Synchronize when value is reset externally
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Debounce typing only when internalValue changes
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const handler = setTimeout(() => {
      onChangeRef.current(internalValue);
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [internalValue, debounceMs]);

  const handleClear = () => {
    setInternalValue('');
    onChangeRef.current('');
  };

  return (
    <div className={`search-bar-wrapper ${className}`}>
      <span className="search-bar-icon">
        <SearchIcon size={16} />
      </span>
      <input
        type="text"
        className="form-input search-bar-input"
        placeholder={placeholder}
        value={internalValue}
        onChange={e => setInternalValue(e.target.value)}
      />
      {internalValue && (
        <button
          type="button"
          className="search-bar-clear"
          onClick={handleClear}
          title="Clear search"
          aria-label="Clear search"
        >
          <XIcon size={14} />
        </button>
      )}
    </div>
  );
};
