import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Album.module.scss';
import Modal from '../../Modal/Modal';

const Album = ({ album }) => {
  const [showModal, setShowModal] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutsideModal);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('mousedown', handleClickOutsideModal)
        document.removeEventListener('keydown', handleKeyDown);
      }
    }
  }, [showModal]);

  const handleClickOutsideModal = (event) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target)
    ) {
      setShowModal(false)
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setShowModal(false);
    }
  }

  return (
    <>
      <li
        className={`${styles.album} ${showModal ? styles.active : "xx"}`}
        onClick={() => setShowModal(true)}
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
      </li>
      {showModal && createPortal(
        <Modal
          album={album}
          modalRef={modalRef}
          onClose={() => setShowModal(false)}
        />,
        document.body
      )}
    </>
  )
}

export default Album;