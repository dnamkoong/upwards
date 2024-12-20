import { createPortal } from 'react-dom';
import classNames from 'classnames';
import styles from './Album.module.scss';
import Modal from '../../Modal/Modal';
import { AlbumInterface } from '../../../types/albums';
import { useDetectClick } from '../../../hooks/useDetectClick';

interface AlbumProps {
  album: AlbumInterface;
}

const Album = ({ album }: AlbumProps) => {
  const {
    isActive,
    setIsActive,
    hookRef
  } = useDetectClick();

  return (
    <>
      <div
        className={
          classNames(styles.album, {
            [styles.active]: isActive
          })
        }
        onClick={() => setIsActive(true)}
      >
        <div className={styles.imageContainer}>
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
        <h3>{album['im:name'].label}</h3>
        <p>{album['im:artist'].label}</p>
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