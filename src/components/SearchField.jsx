 const SearchField = ({ searchChange, needle }) => {
  return (
    <div>
      <label htmlFor="search-input" className="sr-only">Search for a country</label>
      <input
        className="shadow-md px-8 py-2 rounded-md focus-visible:outline-none dark:bg-slate-600 dark:placeholder-white"
        type="search"
        id="search-input"
        onChange={searchChange}
        value={needle}
        placeholder="Search for a country..."
      />
    </div>
  );
};

export default SearchField;
