import styles from './Modal.module.scss'
import { useGetTracklist } from '../../hooks/useGetTracklist';

const Modal = ({ album, onClose, modalRef }) => {
  const {
    tracklist,
    loading,
    error
  } = useGetTracklist(album.id.attributes['im:id']);

  return (
    <div
      className={styles.modal}
      ref={modalRef}
    >
      <button onClick={onClose}>Close</button>

      <img
        src={album['im:image'][2].label}
        alt={`${album['im:name'].label} album cover`}
      />

      <p>{album['im:contentType']['im:contentType'].attributes.label}</p>
      <h3>{album['im:name'].label}</h3>
      <p>{album['im:artist'].label}</p>
      <p>{album['im:releaseDate'].label.split('-')[0]}</p>
      <p>{album['im:itemCount'].label} songs</p>
      <p>{album['im:artist'].label}</p>

      {loading && <p>Loading tracks...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {tracklist.map(({
          trackName,
          artistName,
          trackExplicitness,
          trackTimeMillis
        }, i) => (
          <li
            key={i}
          >
            <p>{trackName} - {trackTimeMillis}</p>
            {trackExplicitness !== 'notExplicit' ? <p>'E'</p> : ''}
            <p>{artistName}</p>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default Modal;