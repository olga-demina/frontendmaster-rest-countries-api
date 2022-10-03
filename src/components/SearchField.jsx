const SearchField = ({ searchChange, needle }) => {
  return (
    <div>
      <input type="search" onChange={searchChange} value={needle} />
    </div>
  );
};

export default SearchField;
