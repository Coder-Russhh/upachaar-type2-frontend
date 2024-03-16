import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { searchData } from "../../static/SearchData";

const DoctorSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const searchResultsRef = useRef(null);

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    // Filter searchData
    const filteredResults = searchData.filter((item) => {
      const lowerCasedInput = inputValue.toLowerCase();
      return (
        (item.name && item.name.toLowerCase().includes(lowerCasedInput)) ||
        (item.location &&
          item.location.toLowerCase().includes(lowerCasedInput)) ||
        (item.specialty &&
          item.specialty.toLowerCase().includes(lowerCasedInput)) ||
        (item.hospital &&
          item.hospital.toLowerCase().includes(lowerCasedInput)) ||
        (item.services &&
          item.services.some((service) =>
            service.toLowerCase().includes(lowerCasedInput)
          ))
      );
    });

    setSearchResults(filteredResults);
    setShowResults(true);
  };

  const handleDocumentClick = (e) => {
    // Check if the click is outside the search results area
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(e.target)
    ) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    // Add click event listener to the document
    document.addEventListener("click", handleDocumentClick);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    // Check if the screen size is small
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = (e) => {
      setIsSmallScreen(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className="flex items-center relative">
      <input
        type="text"
        placeholder="Search Your Doctor"
        className="p-2 border border-blue-300 text-black rounded bg-gray-100 w-[90vw] md:w-[20vw] pl-10"
        value={searchInput}
        onChange={handleSearch}
      />
      <FiSearch
        size={15}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
        // onClick={() => setShowResults(!showResults)}
      />
      {/* Display search results */}
      {showResults && (
        <div
          ref={searchResultsRef}
          className="mt-4 bg-color absolute top-12 text-white w-[75vw] pl-6 md:w-[50vw] max-w-md h-48 overflow-y-auto z-10 rounded-lg"
        >
          {searchInput.length > 0 && searchResults.length === 0 ? (
            <p>No results found.</p>
          ) : (
            <>
              <ul className="list-disc">
                {searchResults.map((result) => (
                  <li key={result.id}>
                    <p>Name: {result.name}</p>
                    <p>Specialty: {result.specialty}</p>
                    <p>Location: {result.location}</p>
                    <p>Hospital: {result.hospital}</p>
                    <hr className="my-2 bg-white" />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorSearch;
