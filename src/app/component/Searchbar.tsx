"use client";
import { Input } from "antd";
import React, { useState, useCallback, useEffect, useRef } from "react";

type Props = { onSearch: (username: string) => void };
export default function Searchbar({ onSearch }: Props) {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const lastSearchedRef = useRef("");

  // Debounce the search value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  // Trigger search when debounced value changes
  useEffect(() => {
    const trimmedValue = debouncedValue.trim();
    if (
      trimmedValue &&
      trimmedValue.length > 1 &&
      trimmedValue !== lastSearchedRef.current
    ) {
      lastSearchedRef.current = trimmedValue;
      onSearch(trimmedValue);
    }
  }, [debouncedValue, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = useCallback(() => {
    const trimmedValue = value.trim();
    if (trimmedValue && trimmedValue !== lastSearchedRef.current) {
      lastSearchedRef.current = trimmedValue;
      onSearch(trimmedValue);
    }
  }, [value, onSearch]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setValue("");
    setDebouncedValue("");
    lastSearchedRef.current = "";
  };

  return (
    <div className="search-container">
      <Input
        value={value}
        placeholder="Type GitHub username "
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onClear={handleClear}
        size="large"
        className="search-input"
        allowClear
      />
      {value.length > 0 && value.length <= 1 && (
        <div className="search-hint">Type at least 2 characters to search</div>
      )}
    </div>
  );
}
