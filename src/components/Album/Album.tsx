import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { AlbumInterface } from '../../types/albums';
import { useDetectClick } from '../../hooks/useDetectClick';
import Modal from '../Modal/Modal';
import Icon from '../Icon/Icon'
import styles from './Album.module.scss'

interface AlbumProps {
  album: AlbumInterface;
  handleFavorite: (data: AlbumInterface) => void;
  favorites: AlbumInterface[];
}

const Album = ({ album, handleFavorite, favorites }: AlbumProps) => {
  const {
    isActive,
    setIsActive,
    hookRef
  } = useDetectClick();
  const [iconType, setIconType] = useState<'Favorite' | 'FavoriteBorder'>('FavoriteBorder');

  // Display type of icon depending on if album has been selected to be a favorite
  useEffect(() => {
    const type = favorites.filter((prev) =>
      prev?.id.attributes['im:id'] === album.id.attributes['im:id']
    );

    setIconType(
      type.length > 0
        ? 'Favorite'
        : 'FavoriteBorder'
    );
  }, [favorites]);

  return (
    <>
      <div
        className={
          classNames(styles.album, {
            [styles.active]: isActive
          })
        }
      >
        <div
          className={styles.imageContainer}
          onClick={() => setIsActive(true)}
        >
          <img
            src={album['im:image'][2].label}
            alt="album cover"
            className={styles.mainImage}
          />

          <img
            src={album['im:image'][2].label}
            alt="album cover"
            className={styles.hoverImage}
          />
        </div>
        <div onClick={() => setIsActive(true)}>
          <h3>{album['im:name'].label}</h3>
          <p>{album['im:artist'].label}</p>
        </div>

        <div onClick={() => handleFavorite(album)}>
          <Icon type={iconType} />
        </div>
      </div>
      {isActive && createPortal(
        <Modal
          album={album}
          hookRef={hookRef}
          onClose={() => setIsActive(false)}
        />,
        document.body
      )}
    </>
  )
}

export default Album;