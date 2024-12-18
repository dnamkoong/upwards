const Search = ({ handleSearch, query }) => {
  const handleQuery = (data) => {
    handleSearch(data)
  }

  return (
    <input
      type="text"
      value={query}
      onChange={e => handleQuery(e.target.value)}
    />
  )
}

export default Search