import { useEffect, useState } from "react";
import { useAlbums } from "../../hooks/useAlbums";
import Album from "./Album/Album";
import styles from './Albums.module.scss';
import Sort from "./Sort/Sort";
import Search from "./Search/Search";
import { useDebounce } from "../../hooks/useDebounce";
import { AlbumInterface } from "../../types/albums";
import { SortedAlbumsInterface, SortKeysInterface } from "../../types/sort";

const Albums = () => {
  const { albums } = useAlbums();

  const [sortedAlbums, setSortedAlbums] = useState<AlbumInterface[]>(albums);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search);

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
          const category = album.category.attributes.label.toLowerCase();
          const rights = album.rights.label.toLowerCase();

          return (
            artist.includes(searchLowerCase)
            || title.includes(searchLowerCase)
            || category.includes(searchLowerCase)
            || rights.includes(searchLowerCase)
          )
        })
      )
    }
  }, [albums, debouncedSearch])

  const handleSortData = (data: string) => {
    const [name, type] = data.split('-');
    const sortKeys: SortKeysInterface = {
      artist: 'im:artist.label',
      title: 'im:name.label',
      releaseDate: 'im:releaseDate.label',
      itemCount: 'im:itemCount.label'
    };
    const key = sortKeys[name];

    if (!key) return;

    const [mainKey, subKey] = key.split('.');

    const sorted = [...sortedAlbums].sort((a: SortedAlbumsInterface, b: SortedAlbumsInterface) => {
      const valueA = a[mainKey]?.[subKey];
      const valueB = b[mainKey]?.[subKey];

      if (name === 'releaseDate') {
        const releaseA = new Date(valueA);
        const releaseB = new Date(valueB);

        return type === 'asc'
          ? releaseA.getTime() - releaseB.getTime()
          : releaseB.getTime() - releaseA.getTime()
      }

      return type === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA)
    });

    setSortedAlbums(sorted);
  }

  const handleSearch = (data: string) => {
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