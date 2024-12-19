import { useContext } from "react";
import { AlbumsContext } from "../context/albumsContext";
import { AlbumsInterface } from "../types/albums";

export const useAlbums = (): AlbumsInterface => {
  const albumsContext = useContext(AlbumsContext) as AlbumsInterface;

  return albumsContext;
}