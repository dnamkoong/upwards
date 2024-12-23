import { useEffect, useState } from "react";
import Search from "./components/Search/Search";
import SortBy from "./components/SortBy/SortBy";
import Album from "./components/Album/Album";
import Loading from './components/Loading/Loading';
import { AlbumInterface } from "./types/albums";
import { SortedAlbumsInterface, SortKeysInterface } from "./types/sort";
import { useAlbums } from './hooks/useAlbums';
import { useDebounce } from "./hooks/useDebounce";
import { sortOptions } from "./utils/sortOptions";
import styles from './App.module.scss';

function App() {
  const {
    albums,
    category,
    loading,
    error
  } = useAlbums();

  const [sortedAlbums, setSortedAlbums] = useState<AlbumInterface[]>(albums);
  const [search, setSearch] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string[]>([]);
  const debouncedSearch = useDebounce<string>(search);

  useEffect(() => {
    if (!debouncedSearch) {
      // Set albums to be displayed as default order from API
      setSortedAlbums(albums);
    } else {
      const searchLowerCase =
      debouncedSearch.toLowerCase();

      // If search is found then sort the albums,
      // return matched
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

  useEffect(() => {
    // Filter and show albums that match the selected category option(s)
    // else, display all albums
    setSortedAlbums(activeCategory.length
      ? albums.filter(album => activeCategory.includes(album.category.attributes.label))
      : albums
    );
  }, [activeCategory]);

  // Change the order of the albums depending on selected item in the 'Sort' dropdown
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

  // Filter and display the selected category option(s)
  const handleCategoryData = (data: string | string[]) => {
    setActiveCategory((prevState) => {
      // Add or remove item from the 'activeCategory' state
      const toggleItem = (state: Set<string>, item: string) => {
        state.has(item)
          ? state.delete(item)
          : state.add(item);

        return state;
      };

      const updatedSet = Array.isArray(data)
        ? data.reduce(toggleItem, new Set(prevState))
        : toggleItem(new Set(prevState), data);

      return Array.from(updatedSet);
    });
  };

  // Gets input from Search component
  const handleSearch = (data: string) => {
    setSearch(data);
  }


  if (loading) {
    return <Loading />
  }
  if (error) {
    return <h2>Error: {error}</h2>
  }

  return (
    <div className={styles.albums}>
      <Search
        handleSearch={handleSearch}
        query={search}
      />

      <SortBy
        type='Sort'
        dataSort={sortOptions}
        handleSortByData={handleSortData}
      />

      <SortBy
        type='Category'
        dataCategory={category}
        handleSortByData={handleCategoryData}
      />

      <div className={styles.albumContainer}>
        {sortedAlbums.map((album) => (
          <Album
            key={album.id.attributes['im:id']}
            album={album}
          />
        ))}
      </div>
    </div>
  )
}

export default App
