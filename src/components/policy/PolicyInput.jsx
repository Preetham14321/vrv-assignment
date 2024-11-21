import React, { useState, useEffect, useRef } from 'react';

const SearchDropdown = ({ options, name, data, filterType }) => {
  const [searchTerm, setSearchTerm] = data;
  const [filteredOptions, setFilteredOptions] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilteredOptions([]);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // Update filtered options when search term changes
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    let filtered = [];
    if (Array.isArray(options)) {
      filtered = options.filter(option => {
        if (typeof option === 'string') {
          return option.toLowerCase().includes(term);
        } else if (typeof option === 'object' && filterType) {
          return option[filterType].toLowerCase().includes(term);
        }
        return false;
      });
    }
    setFilteredOptions(filtered);
  };

  // Select option and update input field
  const handleOptionClick = (option) => {
    setSearchTerm(option);
    setFilteredOptions([]);
  };

  const dropdownHeight = `${filteredOptions.length * 30}px`; // Adjust height based on the number of options

  return (
    <div className='relative' ref={dropdownRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        id={filterType}
        name={name}
        placeholder="Search..."
        className="w-64 px-4 py-2 mt-4 uppercase bg-white border border-gray mb-5 rounded shadow focus:outline-none focus:ring"
      />
      {filteredOptions.length > 0 && (
        <ul className="absolute top-11 left-0 w-full px-4 overflow-y-auto h-40 py-2 z-50 uppercase bg-white border border-gray mb-5 rounded shadow focus:outline-none focus:ring" style={{ maxHeight: dropdownHeight }}>
          {filteredOptions.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;
