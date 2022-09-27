const SearchField = ({ searchChange }) => {
  return (
    <div>
      <input type="search" onChange={searchChange} />
    </div>
  );
};

export default SearchField;
