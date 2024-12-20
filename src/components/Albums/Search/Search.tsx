import { Icon } from '../../Icon/Icon';
import styles from './Search.module.scss';

interface SearchProps {
  handleSearch: (search: string) => void;
  query: string;
}

const Search = ({ handleSearch, query }: SearchProps) => {
  return (
    <div className={styles.search}>
      <div className={styles.icon}>
        <Icon type='Search' />
      </div>

      <input
        type="text"
        value={query}
        onChange={e => handleSearch(e.target.value)}
        placeholder="Search"
        className={styles.input}
      />
    </div>
  )
}

export default Search