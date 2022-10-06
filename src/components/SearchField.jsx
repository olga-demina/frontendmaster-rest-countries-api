const SearchField = ({ searchChange, needle }) => {
  return (
    <div>
      <input className="shadow-md px-8 py-2 rounded-md" type="search" onChange={searchChange} value={needle} placeholder="Search for a country..."/>
    </div>
  );
};

export default SearchField;
