import { useAlbumsHook } from "../../hooks/useAlbums";
import Album from "./Album/Album";
import styles from './Albums.module.scss';

const Albums = () => {
  const { albums } = useAlbumsHook();

  return (
    <div className={styles.albums}>
      <h2>Albums</h2>
      <ul>
        {albums.map((album) => (
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