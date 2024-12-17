import { useContext } from "react";
import { AlbumsContext } from "../context/albumsContext";

export const useAlbumsHook = () => {
  const albumsContext = useContext(AlbumsContext);

  return albumsContext;
}