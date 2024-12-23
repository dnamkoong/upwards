import { useState, createContext, useEffect } from "react";
import { AlbumInterface, AlbumsInterface, FeedInterface } from "../types/albums";

export const AlbumsContext = createContext<AlbumsInterface | null>(null);

export const AlbumsProvider = ({ children }: { children: React.ReactNode }) => {
  const [albums, setAlbums] = useState<AlbumInterface[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json');
        const data = (await response.json()) as FeedInterface;
        const albumsData = data.feed.entry;
        const categoryList = Array.from(new Set(albumsData.map(album => album.category.attributes.label)));

        setAlbums(albumsData);
        setCategory(categoryList)
      } catch (error: any) {
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
        category,
        loading,
        error
      }}
    >
      {children}
    </AlbumsContext.Provider>
  )
}