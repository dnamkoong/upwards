import SortIcon from '@mui/icons-material/Sort';
import classNames from 'classnames';
import { sortOptions } from "../../../utils/sortOptions";
import styles from "./Sort.module.scss";
import { useState } from 'react';
import { useDetectClick } from '../../../hooks/useDetectClick';

interface SortProps {
  handleSortData: (data: string) => void;
}

const Sort = ({ handleSortData }: SortProps) => {
  const [sortBy, setSortBy] = useState<string>('');
  const {
    isActive,
    setIsActive,
    hookRef
  } = useDetectClick();

  const handleSort = (data: string) => {
    handleSortData(data);
    setSortBy(data);
    setIsActive(false);
  }

  return (
    <div className={styles.sort}>
      <button
        className={styles.sortButton}
        onClick={() => setIsActive(!isActive)}
      >
        Sort
        <SortIcon fontSize="small" />
      </button>

      <div
        className={
          classNames(styles.dropdown, {
            [styles.active]: isActive
          })
        }
        ref={hookRef}
      >
        {sortOptions.map((option) => (
          <div
            key={`${option.name}-${option.type}`}
            className={
              classNames(styles.option, {
                [styles.active]: sortBy === `${option.name}-${option.type}`
              })
            }
            onClick={() => handleSort(`${option.name}-${option.type}`)}
          >

            {option.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sort