import { useState, createContext, useEffect } from "react";

export const AlbumsContext = createContext(null);

export const AlbumsProvider = ({ children }) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json');
        const data = await response.json();
        const albumsData = data.feed.entry;

        setAlbums(albumsData);
      } catch (error) {
        setError(`Error: ${error.message}`)
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <AlbumsContext.Provider
      value={{
        albums,
        loading,
        error
      }}
    >
      {children}
    </AlbumsContext.Provider>
  )
}