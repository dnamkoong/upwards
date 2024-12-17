import { useState } from "react";
import styles from "./Sort.module.scss";

const sortOptions = [
  { name: 'artist', label: 'Artist (A-Z)', type: 'asc' },
  { name: 'artist', label: 'Artist (Z-A)', type: 'desc' },
  { name: 'title', label: 'Album (A-Z)', type: 'asc' },
  { name: 'title', label: 'Album (Z-A)', type: 'desc' },
  { name: 'releaseDate', label: 'Release Date (New)', type: 'asc' },
  { name: 'releaseDate', label: 'Release Date (Old)', type: 'desc' },
  { name: 'itemCount', label: 'Track Count (^)', type: 'asc' },
  { name: 'itemCount', label: 'Tracks (v)', type: 'desc' }
];

const Sort = ({ handleSortData }) => {
  const [sortBy, setSortBy] = useState('');

  const handleSort = (data) => {
    setSortBy(data);
    handleSortData(data);
  }

  return (
    <div className={styles.sort}>
      <label>Sort by:</label>
      <select
        name="sort"
        onChange={e => handleSort(e.target.value)}
        value={sortBy}
      >
        {sortOptions.map((option) => (
          <option
            key={`${option.name}-${option.type}`}
            value={`${option.name}-${option.type}`}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Sort