import { useState } from "react";
import styles from "./Sort.module.scss";
import { sortOptions } from "../../../utils/sortOptions";

interface SortProps {
  handleSortData: (data: string) => void;
}

const Sort = ({ handleSortData }: SortProps) => {
  const [sortBy, setSortBy] = useState<string>('');

  const handleSort = (data: string) => {
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