import { useState } from 'react';
import classNames from 'classnames';
import { useDetectClick } from '../../../hooks/useDetectClick';
import { Icon } from '../../Icon/Icon';
import styles from "./SortBy.module.scss";
import { SortOptionsInterface } from '../../../types/sort';

interface SortByProps {
  type: 'Sort' | 'Category';
  handleSortByData: (data: string | string[]) => void;
  data: string[] | SortOptionsInterface;
}

const SortBy = ({ type, handleSortByData, data }: SortByProps) => {
  const [sortBy, setSortBy] = useState<string | string[]>([]);
  const {
    isActive,
    setIsActive,
    hookRef
  } = useDetectClick();

  const handleSort = (data: string) => {
    handleSortByData(data);
    setIsActive(false);

    setSortBy((prevState) =>
      type === 'Category'
        ? Array.isArray(prevState)
          ? prevState.includes(data)
            ? prevState.filter((prev) => prev !== data)
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
        ref={hookRef}
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
        // ref={hookRef}
      >

        {type === 'Sort' ? (
          data.map((option) => (
            <div
              key={`${option.name}-${option.type}`}
              className={classNames(styles.option, {
                [styles.active]: sortBy === `${option.name}-${option.type}`,
              })}
              onClick={() => handleSort(`${option.name}-${option.type}`)}
            >
              {option.label}
            </div>
          ))
        ) : (
          data.map((item) => (
            <div
              key={item}
              className={classNames(styles.option, {
                [styles.active]: sortBy.includes(item),
              })}
              onClick={() => handleSort(item)}
            >
              {item}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default SortBy;