import { useState } from 'react';
import classNames from 'classnames';
import styles from "./SortBy.module.scss";
import { SortOptionsInterface } from '../../types/sort';
import { useDetectClick } from '../../hooks/useDetectClick';
import { Icon } from '../Icon/Icon';

interface SortByProps {
  type: 'Sort' | 'Category';
  handleSortByData: (data: string) => void;
  dataSort?: SortOptionsInterface | SortOptionsInterface[];
  dataCategory?: string[];
}

const SortBy = ({ type, handleSortByData, dataSort, dataCategory }: SortByProps) => {
  const [sortBy, setSortBy] = useState<string | string[]>([]);
  const {
    isActive,
    setIsActive,
    hookRef
  } = useDetectClick();

  // Handles Default and Category dropdown sort logic
  // emits string or array of strings to parent
  const handleSort = (data: string) => {
    handleSortByData(data);
    setIsActive(false);

    setSortBy((prevState) =>
      type === 'Category'
        ? Array.isArray(prevState)
          ? prevState.includes(data)
          // if 'prevState' is an array and includeds 'data', filter 'prevState'
            ? prevState.filter((prev) => prev !== data)
            // else add to end of existing array
            : [...prevState, data]
          : [data]
        : data
    );
  }

  return (
    <div className={styles.sortBy}>
      <button
        className={styles.sortByButton}
        onClick={() => setIsActive(!isActive)}
      >
        {type}
        <Icon type={type} />
      </button>

      <div
        className={
          classNames(styles.dropdown, {
            [styles.active]: isActive
          })
        }
        ref={hookRef}
      >

        {
          Array.isArray(dataSort)
          && type === 'Sort' ? (
            dataSort.map((option) => (
              <div
                key={`${option.name}-${option.type}`}
                className={classNames(styles.option, {
                  [styles.active]: sortBy === `${option.name}-${option.type}`,
                })}
                onClick={() => handleSort(`${option.name}-${option.type}`)}
              >
                <p>{option.label}</p>
              </div>
            ))
          ) : (
            dataCategory?.map((item) => (
              <div
                key={item}
                className={classNames(styles.option, {
                  [styles.active]: sortBy.includes(item),
                })}
                onClick={() => handleSort(item)}
              >
                <p>{item}</p>
              </div>
            ))
          )
        }
      </div>
    </div>
  )
}

export default SortBy;