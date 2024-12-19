interface SearchProps {
  handleSearch: (search: string) => void;
  query: string;
}

const Search = ({ handleSearch, query }: SearchProps) => {
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