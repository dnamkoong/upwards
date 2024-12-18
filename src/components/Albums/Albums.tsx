import { useEffect, useState } from "react";
import { useAlbumsHook } from "../../hooks/useAlbums";
import Album from "./Album/Album";
import styles from './Albums.module.scss';
import Sort from "./Sort/Sort";
import Search from "./Search/Search";
import { useDebounce } from "../../utils/useDebounce";

const Albums = () => {
  const { albums } = useAlbumsHook();

  const [sortedAlbums, setSortedAlbums] = useState(albums);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    if (!debouncedSearch) {
      setSortedAlbums(albums);
    } else {
      const searchLowerCase =
      debouncedSearch.toLowerCase();
      setSortedAlbums(
        albums.filter((album) => {
          const artist = album['im:artist'].label.toLowerCase();
          const title = album['im:name'].label.toLowerCase();

          return (
            artist.includes(searchLowerCase)
            || title.includes(searchLowerCase)
          )
        })
      )
    }
  }, [albums, debouncedSearch])

  const handleSortData = (data) => {
    const [name, type] = data.split('-');
    const sortKeys = {
      artist: 'im:artist.label',
      title: 'im:name.label',
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

  const handleSearch = (data) => {
    setSearch(data);
  }

  return (
    <div className={styles.albums}>
      <Sort handleSortData={handleSortData} />
      <Search
        handleSearch={handleSearch}
        query={search}
      />

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