const Search = ({ handleSearch, query }) => {
  return (
    <>
      <label>
        Search:
        <input
          type="text"
          value={query}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Search"
        />
      </label>
    </>
  )
}

export default Search