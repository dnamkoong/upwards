import { useState } from "react";
import { useAlbumsHook } from "../../hooks/useAlbums";
import Album from "./Album/Album";
import styles from './Albums.module.scss';
import Sort from "./Sort/Sort";

const Albums = () => {
  const { albums } = useAlbumsHook();

  const [sortedAlbums, setSortedAlbums] = useState(albums);

  const handleSortData = (data) => {
    sortAlbumsHandler(data);
  }


  const sortAlbumsHandler = (data) => {
    const [name, type] = data.split('-');
    const sortKeys = {
      artist: 'im:artist.label',
      title: 'title.label',
      releaseDate: 'im:releaseDate.label',
      itemCount: 'im:itemCount.label'
    };
    const key = sortKeys[name];

    if (!key) return;

    const [mainKey, subKey] = key.split('.');

    const sorted = [...sortedAlbums].sort((a, b) => {
      const valueA = subKey ? a[mainKey][subKey] : a[mainKey];
      const valueB = subKey ? b[mainKey][subKey] : b[mainKey];

      return type === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA)
    });

    setSortedAlbums(sorted);
  }

  return (
    <div className={styles.albums}>
      <Sort handleSortData={handleSortData} />
      <ul>
        {sortedAlbums.map((album) => (
          <Album
            key={album.id.attributes['im:id']}
            album={album}
          />
        ))}
      </ul>
    </div>
  )
}

export default Albums;