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

    const sortAlbums = [...sortedAlbums].sort((a, b) => {
      if (name === 'artist') {
        const artistA = a['im:artist'].label;
        const artistB = b['im:artist'].label;

        if (type === 'asc') {
          return artistA.localeCompare(artistB);
        } else if (type === 'desc') {
          return artistB.localeCompare(artistA);
        }
      }

      if (name === 'title') {
        const titleA = a['title'].label;
        const titleB = b['title'].label;

        if (type === 'asc') {
          return titleA.localeCompare(titleB);
        } else if (type === 'desc') {
          return titleB.localeCompare(titleA);
        }
      }

      if (name === 'releaseDate') {
        const releaseDateA = a['im:releaseDate'].label;
        const releaseDateB = b['im:releaseDate'].label;

        if (type === 'asc') {
          return releaseDateA.localeCompare(releaseDateB);
        } else if (type === 'desc') {
          return releaseDateB.localeCompare(releaseDateA);
        }
      }

      if (name === 'itemCount') {
        const itemCountA = a['im:itemCount'].label;
        const itemCountB = b['im:itemCount'].label;

        if (type === 'asc') {
          return itemCountA.localeCompare(itemCountB);
        } else if (type === 'desc') {
          return itemCountB.localeCompare(itemCountA);
        }
      }

      return 0;
    });

    setSortedAlbums(sortAlbums);
  }

  return (
    <div className={styles.albums}>
      <h2>Albums</h2>
      <Sort handleSortData={handleSortData} />
      <h3>XX: {sortedAlbums[0]['im:name'].label}</h3>
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